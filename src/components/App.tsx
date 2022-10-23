import { memo } from "preact/compat";
import { siteList } from "@/utils/siteList";
import { GM_getValue } from "$";
import type { Current } from "@/utils/matchList";
import SiteButton from "./SiteButton";

export type RenderSiteItem = {
  name: string;
  targetLink: string;
  status: {
    isSuccess: "pedding" | "rejected" | "fulfilled";
    hasSubtitle: boolean;
    hasLeakage: boolean;
  };
};

const App = memo(function ({ current, CODE }: { current: Current; CODE: string }) {
  const gmSiteList = GM_getValue("gmSiteList", siteList);
  /**  禁用 disable  */
  const siteListFilter = gmSiteList.filter(
    (item) => item.disableHostname !== current.name && !item.disable,
  );

  return (
    <>
      {siteListFilter.map((item) => (
        <SiteButton siteItem={item} CODE={CODE} />
      ))}
    </>
  );
});

export default App;
