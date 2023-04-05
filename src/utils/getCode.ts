import { LibItem } from "./libSites";

export function getCode(cms: LibItem): string {
  const { codeQueryStr } = cms.querys;
  const codeNode = document.querySelector<HTMLElement>(codeQueryStr);
  if (!codeNode) return "";

  const codeText =
    cms.name === "javdb"
      ? (codeNode.dataset.clipboardText as string)
      : codeNode.innerText.replace("复制", "");

  if (codeText?.includes("FC2")) return codeText.split("-")[1];

  return codeText;
}
