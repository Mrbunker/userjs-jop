import { gmFetch, isCaseInsensitiveEqual, isErrorCode, regEnum } from "@/utils";
import type { DomQuery_get, DomQuery_parser, SiteItem } from "./siteList";

export type FetchResult = {
  isSuccess: boolean;
  targetLink: string;
  hasSubtitle: boolean;
  hasLeakage: boolean;
  msg: string;
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
) {
  const doc = new DOMParser().parseFromString(responseText, "text/html");

  const linkNode = linkQuery ? doc.querySelectorAll<HTMLAnchorElement>(linkQuery)[listIndex] : null;
  const titleNode = titleQuery ? doc.querySelectorAll(titleQuery)[listIndex] : null;
  const titleNodeText = titleNode ? titleNode?.outerHTML : "";

  const codeRegex = /[a-zA-Z]{3,5}-\d{3,5}/;
  const matchCode = titleNodeText.match(codeRegex);
  const isSuccess =
    linkNode && titleNode && matchCode && isCaseInsensitiveEqual(matchCode[0], CODE);

  if (isSuccess) {
    const targetLinkText = linkNode.href.replace(linkNode.hostname, siteHostName);
    return {
      isSuccess: true,
      targetLink: targetLinkText,
      hasLeakage: regEnum.leakage.test(titleNodeText),
      hasSubtitle: regEnum.subtitle.test(titleNodeText),
    };
  } else {
    return { targetLink: "", isSuccess: false, hasSubtitle: false, hasLeakage: false };
  }
}

export const handleFetch = async (
  siteItem: SiteItem,
  targetLink: string,
  CODE: string,
): Promise<FetchResult> => {
  try {
    const response = await gmFetch({ url: targetLink });
    if (isErrorCode(response.status)) {
      // 请求 404，大概是对应网站没有资源
      throw Error(String(response.status));
    }

    if (siteItem.fetcher === "get") {
      // 直接 get 网页，成功，需要进一步解析 videoPage，获取字幕等信息
      return {
        ...videoPageParser(response.responseText, siteItem.domQuery),
        targetLink,
        msg: "[get]，存在资源",
      };
    } else {
      // 需要解析 searchPage  siteItem.fetcher === "parser"
      return {
        ...serachPageParser(response.responseText, siteItem.domQuery, siteItem.hostname, CODE),
        msg: "[parser]存在资源",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      targetLink: targetLink,
      hasSubtitle: false,
      hasLeakage: false,
      msg: String(error),
    };
  }
};
