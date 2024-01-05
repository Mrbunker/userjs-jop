import { GM_xmlhttpRequest } from "$";
import { type LibItem } from "./libSites";
import { SP_PREFIX } from "./siteList";

export const isCaseInsensitiveEqual = (str1: string, str2: string) => {
  return str1.toLowerCase() === str2.toLowerCase();
};

export const isErrorCode = (resCode: number) => {
  return [404, 403].includes(resCode);
};

export const regEnum = {
  subtitle: /(中文|字幕|subtitle)/,
  leakage: /(无码|無碼|泄漏|Uncensored)/,
};

export const getCode = (libItem: LibItem): string => {
  const { codeQueryStr } = libItem.querys;
  const codeNode = document.querySelector<HTMLElement>(codeQueryStr);
  if (!codeNode) return "";

  const codeText =
    libItem.name === "javdb"
      ? (codeNode.dataset.clipboardText as string)
      : codeNode.innerText.replace("复制", "");

  if (codeText.includes("FC2")) return codeText.split("-")[1];
  if (codeText.startsWith(SP_PREFIX)) return codeText.substring(3);

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

export const gmFetch = ({ url }: { url: string }): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url,
      onload: (response) => resolve(response),
      onerror: (error) => reject(error),
    });
  });
};
