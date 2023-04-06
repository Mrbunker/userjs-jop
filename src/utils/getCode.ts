import { type LibItem } from "./libSites";

export function getCode(libItem: LibItem): string {
  const { codeQueryStr } = libItem.querys;
  const codeNode = document.querySelector<HTMLElement>(codeQueryStr);
  if (!codeNode) return "";

  const codeText =
    libItem.name === "javdb"
      ? (codeNode.dataset.clipboardText as string)
      : codeNode.innerText.replace("复制", "");

  if (codeText?.includes("FC2")) return codeText.split("-")[1];

  return codeText;
}
