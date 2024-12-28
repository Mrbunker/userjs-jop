import { siteList } from "../src/utils/siteList";

const cleanUrl = (url: string): string => {
  return url.replace(/^(https?:\/\/)?(www\.)?/, "");
};

const getLibMirror = async () => {
  const user = "javlibcom";
  const res = await fetch(`https://api.github.com/users/${user}`);
  const data = (await res.json()) || {};
  return cleanUrl(data.blog ?? "");
};

const getDbMirror = async () => {
  const res = await fetch(`https://javdb.com/`);
  const htmlText = await res.text();

  const navMatch = htmlText.match(/<nav[^>]*class="[^"]*sub-header[^"]*"[^>]*>([\s\S]*?)<\/nav>/i);
  if (!navMatch) return [];

  const hrefRegex = /href="([^"]+)"/g;
  return [...navMatch[1].matchAll(hrefRegex)].map((match) => cleanUrl(match[1])).filter(Boolean);
};

const libMirrorUrl = await getLibMirror();
const dbMirrorUrls = await getDbMirror();

const connectList = siteList.map((site) => site.hostname);

const includeList = [
  /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/,
  /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/,
  /^https?:\/\/(\w*\.)?javlibrary\.com.*$/,
  /^http.*\/cn\/\?v=jav.*$/,
];

const mirrorList = [...dbMirrorUrls, libMirrorUrl];
export default {
  match: [...mirrorList],
  connect: connectList,
  include: includeList,
};
