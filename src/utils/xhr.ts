import { gmGet, isCaseInsensitiveEqual, isErrorCode, regEnum } from "./";
import type { DomQuery_get, DomQuery_parser, SiteItem } from "./siteList";

export type FetchResult = {
  isSuccess: boolean;
  targetLink?: string;
  tag?: string;
  multipResLink?: string;
  multipleRes?: boolean;
};

/** 针对视频播放页进行解析，寻找字幕等信息 */
function videoPageParser(responseText: string, { subQuery, leakQuery, videoQuery }: DomQuery_get) {
  const doc = new DOMParser().parseFromString(responseText, "text/html");

  const subNode = subQuery ? doc.querySelector<HTMLElement>(subQuery) : "";
  const subNodeText = subNode ? subNode.innerHTML : "";
  const leakNode = leakQuery ? doc.querySelector<HTMLElement>(leakQuery) : null;
  const linkNodeText = leakNode ? leakNode.innerHTML : "";

  /** 部分网站收录视频，但是未提供播放资源，所以需要使用 videoQuery 进一步检测是否存在在线播放。
   * videoQuery 为 undefine 时，不需要查找 video
   */
  const videoNode = videoQuery ? doc.querySelector<HTMLElement>(videoQuery) : true;
  return {
    isSuccess: !!videoNode,
    hasSubtitle: regEnum.subtitle.test(subNodeText),
    hasLeakage: regEnum.leakage.test(linkNodeText),
  };
}

/** 针对 fetcher==="parser" 时的搜索结果页进行解析，寻找是否存在视频资源。
 * linkQuery & titleQuery 都是必须，
 * linkQuery 有结果且 titleQuery 有结果包含 code，返回 isSuccess。
 * 再检查下 title 中是否含有字幕信息等
 */
function serachPageParser(
  responseText: string,
  { linkQuery, titleQuery, listIndex = 0 }: DomQuery_parser,
  siteHostName: string,
  CODE: string,
  searchPageLink: string,
) {
  const doc = new DOMParser().parseFromString(responseText, "text/html");

  const titleNodes = titleQuery ? doc.querySelectorAll(titleQuery) : [];
  const linkNodes = linkQuery ? doc.querySelectorAll<HTMLAnchorElement>(linkQuery) : [];

  const titleNode = titleNodes[listIndex];

  const linkNode = linkNodes[listIndex];
  const titleNodeText = titleNode ? titleNode?.outerHTML : "";

  const codeRegex = /[a-zA-Z]{3,5}-\d{3,5}/;
  const matchCode = titleNodeText.match(codeRegex);
  const isSuccess =
    linkNode && titleNode && matchCode && isCaseInsensitiveEqual(matchCode[0], CODE);

  if (!isSuccess) {
    return { isSuccess: false };
  }
  const targetLinkText = linkNode.href.replace(linkNode.hostname, siteHostName);
  const hasLeakage = regEnum.leakage.test(titleNodeText);
  const hasSubtitle = regEnum.subtitle.test(titleNodeText);
  const tags = [];
  if (hasLeakage) tags.push("无码");
  if (hasSubtitle) tags.push("字幕");
  return {
    isSuccess: true,
    targetLink: targetLinkText,
    multipResLink: searchPageLink,
    multipleRes: titleNodes.length > 1,
    tag: tags.join(" "),
  };
}

type Args = {
  siteItem: SiteItem;
  targetLink: string;
  CODE: string;
};
export const baseFetcher = async ({ siteItem, targetLink, CODE }: Args): Promise<FetchResult> => {
  try {
    const response = await gmGet({ url: targetLink });
    if (isErrorCode(response.status)) {
      // 请求 404，大概是对应网站没有资源
      throw Error(String(response.status));
    }

    if (siteItem.fetchType === "get") {
      // 直接 get 网页，成功，需要进一步解析 videoPage，获取字幕等信息
      return {
        ...videoPageParser(response.responseText, siteItem.domQuery),
        targetLink,
      };
    } else {
      return {
        ...serachPageParser(
          response.responseText,
          siteItem.domQuery,
          siteItem.hostname,
          CODE,
          targetLink,
        ),
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      targetLink: targetLink,
    };
  }
};

/** jable 有些域名是带 -c */
export const javbleFetcher = async (args: Args): Promise<FetchResult> => {
  const res = await baseFetcher(args);
  if (res.isSuccess) return res;
  const newLink = args.targetLink.slice(0, -1) + "-c/";
  return await baseFetcher({ ...args, targetLink: newLink });
};

export const fetcher = (args: Args) => {
  if (args.siteItem.name === "Jable") {
    return javbleFetcher(args);
  }

  return baseFetcher(args);
};
