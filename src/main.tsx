import { render } from "preact";
import { xhr } from "./utils/xhr";
import { Cms, matchList } from "./utils/matchList";
import { siteList } from "./utils/siteList";
import { getInfos } from "./utils/getInfos";
import { createButtonNode, createPanel } from "./utils/createNode";
import "./style.css";

import Panel from "./components/Panel";

// !debugger 图片关
// document.querySelectorAll("img").forEach((item) => (item.style.display = "none"));

function main() {
  /** 当前 macth 站点对象 */
  const cms = matchList.find((item) => item.hostname === window.location.hostname) as Cms;
  cms.method();
  const infos = getInfos(cms);
  const CODE = infos.codeText;
  if (CODE === undefined) return;

  const panelParent = document.querySelector(cms.panelParentQueryStr);
  panelParent?.classList.add("jop-panelParent");
  panelParent &&
    render(
      <Panel
        cms={cms}
        infos={infos}
      />,
      panelParent,
    );
}

main();
