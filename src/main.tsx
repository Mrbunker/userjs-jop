import { render } from "preact";
import { Cms, matchList } from "./utils/matchList";
import { getInfos } from "./utils/getInfos";
import "./style.css";

import App from "./components/App";

// !debugger 图片关
// document.querySelectorAll("img").forEach((item) => (item.style.display = "none"));

function main() {
  /** 当前 macth 站点对象 */
  const cms = matchList.find((item) => item.hostname.includes(window.location.hostname)) as Cms;
  const infos = getInfos(cms);
  const CODE = infos.codeText;
  if (CODE === undefined) return;
  cms.method();

  const panelParent = document.querySelector(cms.panelParentQueryStr) as Element;
  panelParent?.classList.add("jop-panelParent");
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
