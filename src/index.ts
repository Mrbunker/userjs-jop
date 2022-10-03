import { createButtonNode, createPanel } from "./createNode";
import { matchList } from "./matchList";
import { siteList } from "./siteList";
import { xhr } from "./xhr";

import type { Cms } from "./matchList";

import "./style.css";

function getCode(cmsName: Cms["name"]) {
  if (cmsName === "javdb") {
    return document.querySelector<HTMLElement>(`[data-clipboard-text]`)?.dataset
      .clipboardText as string;
  } else if (cmsName === "javbus") {
    return document
      .querySelector<HTMLElement>(`span[style="color:#CC0000;"]`)
      ?.innerText.replace("复制", "") as string;
  } else {
    return document.querySelector<HTMLElement>(`#video_id td.text`)?.innerHTML as string;
  }
}

export async function main(HOSTNAME: string) {
  /** 当前 macth 站点对象 */
  const cms = matchList.find((item) => item.hostname === HOSTNAME) as Cms;
  const CODE = getCode(cms.name);
  const panel = createPanel();

  /** 禁用部分 */
  const envSiteList = siteList.filter((item) => item.disable !== cms.name);
  envSiteList.forEach(async (siteItem) => {
    const siteUrl = siteItem.url.replace("{{code}}", CODE);

    const { setButtonStatus } = createButtonNode(panel, siteItem.name, siteUrl);

    const { isSuccess, hasLeakage, hasSubtitle, targetLink } = await xhr(siteItem, siteUrl, CODE);

    setButtonStatus(targetLink, isSuccess ? "green" : "red", hasLeakage, hasSubtitle);
  });
}

main(window.location.hostname);
