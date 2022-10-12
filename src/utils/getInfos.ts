import { getDbScore } from "@/utils/xhr";
import { Infos } from "@/components/Info";
import { Cms } from "./matchList";

export function getInfos(cms: Cms): Infos {
  const { codeQueryStr, actorQueryStr } = cms.querys;
  const codeNode = document.querySelector<HTMLElement>(codeQueryStr);
  const actorNodeList = document.querySelectorAll<HTMLAnchorElement>(actorQueryStr);
  const actorList = [...actorNodeList].map((item) => {
    return { text: item.innerHTML, link: item.href };
  });

  // !todo 需要写一个 jdb parser ,来填下面的 url
  const score = getDbScore("https://javdb.com/v/RwRw4");

  return {
    codeText:
      cms.name === "javdb"
        ? (codeNode?.dataset.clipboardText as string)
        : codeNode?.innerText.replace("复制", ""),
    actorList,
  };
}
