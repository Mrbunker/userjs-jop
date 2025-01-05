import { siteList } from "../src/utils/siteList";

const cleanUrl = (url: string): string => {
  const domainMatch = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
  if (!domainMatch) return "";
  const domain = domainMatch[1];
  return `*://*.${domain}/*`;
};

const getLibMirror = async () => {
  if (process.env.NODE_ENV !== "production") {
    return "";
  }
  try {
    const user = "javlibcom";
    const res = await fetch(`https://api.github.com/users/${user}`);
    const data = await res.json();
    return cleanUrl(data.blog ?? "");
  } catch (error) {
    console.warn("Error fetching lib mirror:", error);
    return "";
  }
};

const getDbMirrors = async () => {
  try {
    const res = await fetch(`https://javdb.com/`);
    const htmlText = await res.text();

    const navMatch = htmlText.match(
      /<nav[^>]*class="[^"]*sub-header[^"]*"[^>]*>([\s\S]*?)<\/nav>/i,
    );
    if (!navMatch) return [];

    const hrefRegex = /href="([^"]+)"/g;
    return [...navMatch[1].matchAll(hrefRegex)].map((match) => cleanUrl(match[1])).filter(Boolean);
  } catch (error) {
    console.warn("Error fetching db mirror:", error);
    return [];
  }
};

const libMirrorUrl = await getLibMirror();
const dbMirrorUrls = await getDbMirrors();

const connectList = siteList.map((site) => site.hostname);

const includeList = [
  /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/,
  /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/,
  /^https?:\/\/(\w*\.)?javlibrary\.com.*$/,
  /^http.*\/cn\/\?v=jav.*$/,
];

const mirrorList = [...dbMirrorUrls, libMirrorUrl].filter(Boolean);
export default {
  match: [...mirrorList],
  connect: connectList,
  include: includeList,
};
