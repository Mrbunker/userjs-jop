import { render } from "preact";
import { libSites } from "@/utils/libSites";
import { getCode } from "@/utils";

import "@/style.css";
import App from "./components/App";

if (!import.meta.env.PROD) {
  document.querySelectorAll("img").forEach((item) => (item.style.visibility = "hidden"));
}

function main() {
  /** 当前匹配的图书馆站点对象 */
  const libItem = libSites.find((item) => document.querySelector(item.identifier));
  if (!libItem) {
    console.error("||jop 匹配站点失败");
    return;
  }
  const CODE = getCode(libItem);

  // 执行对于当前图书馆站的特殊适配，如单独的样式改动
  libItem.method();

  const panel = document.querySelector<HTMLElement>(libItem.querys.panelQueryStr);
  if (!panel) {
    console.error("||jop 插入界面失败");
    return;
  }

  const app = document.createElement("div");
  app.classList.add("jop-app");
  // app.classList.add(a.toString());
  panel.append(app);

  render(<App libItem={libItem} CODE={CODE} />, app);
  console.log("||脚本挂载成功", CODE);
}

main();
