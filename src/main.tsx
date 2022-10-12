import { render } from "preact";
import { Cms, matchList } from "@/utils/matchList";
import { getInfos } from "@/utils/getInfos";

import "./style.css";

import App from "./components/App";

// !debugger 图片关
// document.querySelectorAll("img").forEach((item) => (item.style.display = "none"));

function main() {
  /** 当前 macth 站点对象 */
  const cms = matchList.find((item) => item.href.test(window.location.href)) as Cms;
  const infos = getInfos(cms);
  const CODE = infos.codeText;
  if (CODE === undefined) return;
  cms.method();
  const panelParent = document.querySelector<HTMLElement>(cms.querys.panelParentQueryStr);
  if (panelParent === null) return;
  panelParent.style.position = "relative";

  render(
    <App
      cms={cms}
      CODE={CODE}
      infos={infos}
    />,
    panelParent,
  );
}

main();
