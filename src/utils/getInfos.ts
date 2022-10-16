import { parserJavdb } from "@/utils/xhr";
import { Infos } from "@/components/Info";
import { Cms } from "./matchList";

export async function getInfos(cms: Cms): Promise<Infos> {
  const { codeQueryStr, actorQueryStr } = cms.querys;
  const codeNode = document.querySelector<HTMLElement>(codeQueryStr);
  const actorNodeList = document.querySelectorAll<HTMLAnchorElement>(actorQueryStr);
  const actorList = [...actorNodeList].map((item) => {
    return { text: item.innerHTML, link: item.href };
  });

  const codeText =
    cms.name === "javdb"
      ? (codeNode?.dataset.clipboardText as string)
      : codeNode?.innerText.replace("复制", "");

  const { score, release } = await parserJavdb(codeText);
  console.log("| ", score, release);
  return {
    codeText,
    actorList,
    score,
  };
}
