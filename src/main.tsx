import { render } from "preact";
import { libSites } from "@/utils/libSites";
import { getCode } from "@/utils";

import "@/style.css";
import App from "./components/App";

// !debugger 关图片
// document.querySelectorAll("img").forEach((item) => (item.style.display = "none"));

function main() {
  /** 当前匹配的图书馆站点对象 */
  const libItem = libSites.find((item) => item.href.test(window.location.href));
  if (!libItem) {
    console.error("||脚本挂载错误");
    return;
  }
  const CODE = getCode(libItem);

  // 执行对于当前图书馆站的特殊适配，如单独的样式改动
  libItem.method();

  const panel = document.querySelector<HTMLElement>(libItem.querys.panelQueryStr);
  if (!panel) {
    console.error("||脚本挂载错误");
    return;
  }

  const app = document.createElement("div");
  app.classList.add("jop-app");
  panel.append(app);

  render(<App libItem={libItem} CODE={CODE} />, app);
  console.log("||脚本挂载成功", CODE);
}

main();
