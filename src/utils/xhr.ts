import { gmGet, isCaseInsensitiveEqual, isErrorCode, tagsQuery } from "./";
import type { DomQuery_get, SiteItem, SiteItem_get, SiteItem_parser } from "./siteList";

export type FetchResult = {
  isSuccess: boolean;
  resultLink?: string;
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
  const leakNodeText = leakNode ? leakNode.innerHTML : "";
  /** 部分网站收录视频，但是未提供播放资源，所以需要使用 videoQuery 进一步检测是否存在在线播放。
   * videoQuery 为 undefine 时，不需要查找 video
   */
  const videoNode = videoQuery ? doc.querySelector<HTMLElement>(videoQuery) : true;
  return {
    isSuccess: !!videoNode,
    tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText }),
  };
}

function searchPageCodeCheck(
  titleNodes: NodeListOf<Element> | never[],
  siteItem: SiteItem_parser,
  CODE: string,
) {
  if (!titleNodes || titleNodes.length === 0) return { isSuccess: false, titleNodeText: "" };
  const codeRegex = /[a-zA-Z]{3,5}-\d{3,5}/;
  if (siteItem.strictParser) {
    const nodes = Array.from(titleNodes);
    const passNodes = nodes.filter((node) => {
      const nodeCode = node.outerHTML.match(codeRegex);
      return isCaseInsensitiveEqual(nodeCode?.[0], CODE);
    });
    const titleNodeText = passNodes.map((node) => node.outerHTML).join(" ");
    return {
      titleNodeText,
      isSuccess: passNodes.length > 0,
      multipleRes: passNodes.length > 1,
    };
  } else {
    const titleNode = titleNodes[siteItem.domQuery.listIndex ?? 0];
    const titleNodeText = titleNode ? titleNode?.outerHTML : "";
    const matchCode = titleNodeText.match(codeRegex);
    const isSuccess = isCaseInsensitiveEqual(matchCode?.[0], CODE);
    return { titleNodeText, isSuccess, multipleRes: titleNodes.length > 1 };
  }
}

/** 针对 fetcher==="parser" 时的搜索结果页进行解析，寻找是否存在视频资源。
 * linkQuery & titleQuery 都是必须，
 * linkQuery 有结果且 titleQuery 有结果包含 code，返回 isSuccess。
 * 再检查下 title 中是否含有字幕信息等
 */
function serachPageParser(responseText: string, siteItem: SiteItem_parser, CODE: string) {
  const { linkQuery, titleQuery } = siteItem.domQuery;
  const doc = new DOMParser().parseFromString(responseText, "text/html");

  const titleNodes = titleQuery ? doc.querySelectorAll(titleQuery) : [];
  const { isSuccess, titleNodeText, multipleRes } = searchPageCodeCheck(titleNodes, siteItem, CODE);

  const linkNodes = linkQuery ? doc.querySelectorAll<HTMLAnchorElement>(linkQuery) : [];
  const linkNode = linkNodes[siteItem.domQuery.listIndex ?? 0];

  if (!isSuccess) {
    return { isSuccess: false };
  }
  const resultLinkText = linkNode.href.replace(linkNode.hostname, siteItem.hostname);
  return {
    isSuccess: true,
    resultLink: resultLinkText,
    multipleRes,
    tag: tagsQuery({ leakageText: titleNodeText, subtitleText: titleNodeText }),
  };
}

type Args = {
  siteItem: SiteItem;
  targetLink: string;
  CODE: string;
};

const baseFetcher = async ({ siteItem, targetLink, CODE }: Args): Promise<FetchResult> => {
  if (siteItem.fetchType === "false") {
    return Promise.resolve({
      isSuccess: true,
      resultLink: targetLink,
    });
  }

  try {
    const response = await gmGet({ url: targetLink });
    if (isErrorCode(response.status)) {
      // 请求 404，大概是对应网站没有资源
      throw Error(String(response.status));
    }
    if (siteItem.fetchType === "get") {
      // 直接 get 网页，成功，需要进一步解析 videoPage，获取字幕等信息
      return {
        resultLink: targetLink,
        ...videoPageParser(response.responseText, siteItem.domQuery),
      };
    } else {
      return {
        ...serachPageParser(response.responseText, siteItem, CODE),
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
    };
  }
};

/** jable 有些域名是带 -c */
const javbleFetcher = async (args: Args): Promise<FetchResult> => {
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
