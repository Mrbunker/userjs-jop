import { Current } from "./matchList";

export function getCode(cms: Current): string | undefined {
  const { codeQueryStr } = cms.querys;
  const codeNode = document.querySelector<HTMLElement>(codeQueryStr);

  const codeText =
    cms.name === "javdb"
      ? (codeNode?.dataset.clipboardText as string)
      : codeNode?.innerText.replace("复制", "");

  return codeText;
}
