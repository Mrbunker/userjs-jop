import { GM_xmlhttpRequest } from "$";
import { type LibItem } from "./libSites";

const isCaseInsensitiveEqual = (str1: string, str2: string) => {
  return str1.toLowerCase() === str2.toLowerCase();
};

const isErrorCode = (resCode: number) => {
  return [404, 403].includes(resCode);
};

const regEnum = {
  subtitle: /(中文|字幕|subtitle)/,
  leakage: /(无码|無碼|泄漏|Uncensored)/,
};

const getCode = (libItem: LibItem): string => {
  const { codeQueryStr } = libItem.querys;
  const codeNode = document.querySelector<HTMLElement>(codeQueryStr);
  if (!codeNode) return "";

  const codeText =
    libItem.name === "javdb"
      ? (codeNode.dataset.clipboardText as string)
      : codeNode.innerText.replace("复制", "");

  if (codeText?.includes("FC2")) return codeText.split("-")[1];

  return codeText;
};
interface TResponse {
  readonly responseHeaders: string;
  readonly readyState: 0 | 1 | 2 | 3 | 4;
  readonly response: any;
  readonly responseText: string;
  readonly responseXML: Document | null;
  readonly status: number;
  readonly statusText: string;
  readonly finalUrl: string;
}

const gmFetch = ({ url }: { url: string }): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url,
      onload: (response) => resolve(response),
      onerror: (error) => reject(error),
    });
  });
};

export { isCaseInsensitiveEqual, isErrorCode, getCode, gmFetch, regEnum as regEnum };
