import { render } from "preact";
import { Current, matchList } from "@/utils/matchList";
import { getCode } from "@/utils/getCode";

import "@/style.css";
import App from "./components/App";

// !debugger 图片关
// document.querySelectorAll("img").forEach((item) => (item.style.display = "none"));

function main() {
  /** 当前 macth 站点对象 */
  const current = matchList.find((item) => item.href.test(window.location.href)) as Current;

  const CODE = getCode(current);
  if (CODE === undefined) return;

  current.method();

  const panel = document.querySelector<HTMLElement>(current.querys.panelQueryStr);
  if (panel === null) return;

  const app = document.createElement("div");
  app.classList.add("jopApp");
  panel.append(app);

  render(<App current={current} CODE={CODE} />, app);
}

main();
