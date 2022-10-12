import { Infos } from "../components/Info";
import { Cms } from "./matchList";

export function getInfos(cms: Cms): Infos {
  const codeNode = document.querySelector<HTMLElement>(cms.codeQueryStr);
  const actorNodeList = document.querySelectorAll<HTMLAnchorElement>(cms.actorQueryStr);
  const actorList = [...actorNodeList].map((item) => {
    return { text: item.innerHTML, link: item.href };
  });
  return {
    codeText:
      cms.name === "javdb"
        ? (codeNode?.dataset.clipboardText as string)
        : codeNode?.innerText.replace("复制", ""),
    actorList,
  };
}
