import { GM_xmlhttpRequest } from "$";
import type { DomQuery_get, DomQuery_parser, SiteItem } from "./siteList";

export type xhrResult = {
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
  // 部分网站收录视频，但是未提供播放资源，所以需要使用 videoQuery 进一步检测是否存在在线播放
  /** videoQuery 为 undefine 时，不需要查找 video */
  const videoNode = videoQuery ? doc.querySelector<HTMLElement>(videoQuery) : true;
  return {
    isSuccess: !!videoNode,
    hasSubtitle: subNodeText.includes("字幕") || subNodeText.includes("subtitle"),
    hasLeakage: !!leakNode,
  };
}

/** 针对 fetcher==="parser" 时的搜索结果页进行解析，寻找是否存在视频资源。
 * linkQuery、titleQuery 都是必须，
 * linkQuery 有结果且 titleQuery 结果包含 code，返回 isSuccess。
 * 再检查下 title 中是否含有字幕信息等
 */
function serachPageParser(
  responseText: string,
  { linkQuery, titleQuery, listIndex = 0, spaceCode = false }: DomQuery_parser,
  siteHostName: string,
  CODE: string,
) {
  const doc = new DOMParser().parseFromString(responseText, "text/html");

  const linkNode = linkQuery ? doc.querySelectorAll<HTMLAnchorElement>(linkQuery)[listIndex] : null;
  const titleNode = titleQuery ? doc.querySelectorAll(titleQuery)[listIndex] : null;
  const titleNodeText = titleNode ? titleNode?.outerHTML : "";

  function query() {
    /** 空格版本的 code */
    const envCodeWithSpace = spaceCode ? CODE.replace("-", " ") : CODE;
    const condition =
      linkNode &&
      titleNode &&
      (titleNodeText.includes(envCodeWithSpace) || titleNodeText.includes(CODE));

    if (condition) {
      return {
        isSuccess: true,
        targetLink: linkNode.href.replace(linkNode.hostname, siteHostName),
        hasLeakage: titleNodeText.includes("无码") || titleNodeText.includes("Uncensored"),
        hasSubtitle: titleNodeText.includes("字幕") || titleNodeText.includes("subtitle"),
      };
    } else {
      return { targetLink: "", isSuccess: false, hasSubtitle: false, hasLeakage: false };
    }
  }
  return query();
}

async function xhr(siteItem: SiteItem, targetLink: string, CODE: string) {
  const xhrPromise: Promise<xhrResult> = new Promise((resolve) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: targetLink,
      onload: (response) => {
        if (siteItem.fetcher === "get") {
          // 直接 get 网页，且 get 结果为 404，大概是对应网站没有资源
          if (response.status === 404) {
            resolve({
              isSuccess: false,
              targetLink,
              hasSubtitle: false,
              hasLeakage: false,
              msg: "应该是没有资源",
            });
          }
          // 直接 get 网页，成功，需要进一步解析 videoPage，获取字幕等信息
          else {
            const { hasSubtitle, hasLeakage, isSuccess } = videoPageParser(
              response.responseText,
              siteItem.domQuery,
            );
            resolve({ isSuccess, targetLink, hasSubtitle, hasLeakage, msg: "[get]，存在资源" });
          }
        }
        // 需要解析 searchPage
        else if (siteItem.fetcher === "parser") {
          const { targetLink, isSuccess, hasLeakage, hasSubtitle } = serachPageParser(
            response.responseText,
            siteItem.domQuery,
            siteItem.hostname,
            CODE,
          );
          resolve({
            isSuccess,
            targetLink: isSuccess ? targetLink : targetLink,
            hasSubtitle,
            hasLeakage,
            msg: "[parser]存在资源",
          });
        }
      },
      onerror: (error) => {
        resolve({
          isSuccess: false,
          targetLink: targetLink,
          hasSubtitle: false,
          hasLeakage: false,
          msg: error.error,
        });
      },
    });
  });
  return xhrPromise;
}
export default xhr;

/** 获取 javdb 的分数
 * 没用了，白写
 */
// export function getDbScore(url: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     GM_xmlhttpRequest({
//       method: "GET",
//       url,
//       onload: (response) => {
//         const doc = new DOMParser().parseFromString(response.responseText, "text/html");
//         const plist = doc.querySelector<HTMLElement>(`.panel.movie-panel-info`);
//         const innerHtml = plist?.innerHTML;
//         const matchResult = innerHtml?.match(/\d\.\d分/);
//         if (!innerHtml || !matchResult) {
//           reject("无评分");
//           return;
//         } else {
//           resolve(matchResult[0]);
//         }
//       },
//       onerror(error) {
//         reject(error);
//       },
//     });
//   });
// }

// interface dbResult {
//   score: string;
//   release: string;
// }
/** 没用了，白写 */
// export function parserJavdb(code?: string): Promise<dbResult> {
//   return new Promise((resolve, reject) => {
//     if (!code) reject("没找到");
//     GM_xmlhttpRequest({
//       url: `https://javdb005.com/search?q=${code}`,
//       method: "GET",
//       onload: (response) => {
//         const doc = new DOMParser().parseFromString(response.responseText, "text/html");
//         const firstItem = doc.querySelectorAll<HTMLElement>(`.movie-list>.item`)[0];
//         const titleString = firstItem.querySelector<HTMLElement>(`.video-title>strong`)?.innerHTML;
//         const releaseString = firstItem.querySelector<HTMLElement>(`.meta`)?.innerHTML.trim();
//         if (titleString !== code || !releaseString) {
//           reject("没找到");
//         } else {
//           const fullScoreText = firstItem.querySelector<HTMLElement>(`.score .value`)?.innerHTML;
//           const matchResult = fullScoreText?.match(/\d\.\d*分/);
//           if (!matchResult) reject("没找到");
//           else
//             resolve({
//               // score: matchResult[0],
//               score: matchResult[0].replace("分", ""),
//               release: releaseString,
//             });
//         }
//       },
//       onerror(error) {
//         reject(error);
//       },
//     });
//   });
// }
