import { createButtonNode, createPanel } from "./utils/createNode";
import { matchList } from "./utils/matchList";
import { siteList } from "./utils/siteList";
import { xhr } from "./utils/xhr";

import type { Cms } from "./utils/matchList";

import "./style.css";

export async function main() {
  /** 当前 macth 站点对象 */
  const cms = matchList.find((item) => item.hostname === window.location.hostname) as Cms;
  const CODE = getCode(cms.name);
  if (CODE === undefined) return;

  const panel = createPanel(cms);

  /** 禁用部分 */
  const envSiteList = siteList.filter((item) => item.disable !== cms.name);
  envSiteList.forEach(async (siteItem) => {
    const siteUrl = siteItem.url.replace("{{code}}", CODE);

    const { setButtonStatus } = createButtonNode(panel, siteItem.name, siteUrl);

    const { isSuccess, hasLeakage, hasSubtitle, targetLink } = await xhr(siteItem, siteUrl, CODE);

    setButtonStatus(targetLink, isSuccess ? "green" : "red", hasLeakage, hasSubtitle);
  });
}

main();
