import { memo } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

import xhr from "@/utils/xhr";
import { siteList } from "@/utils/siteList";
import { GM_getValue } from "$";
import type { Cms } from "@/utils/matchList";
import Info, { Infos } from "./Info";
import SiteButton from "./SiteButton";
import Top from "./Top";

export type RenderSiteItem = {
  name: string;
  // disable: boolean;
  // disableHostname?: string;
  targetLink: string;
  status: {
    isSuccess: "pedding" | "rejected" | "fulfilled";
    hasSubtitle: boolean;
    hasLeakage: boolean;
  };
};

const App = memo(function ({ cms, infos, CODE }: { cms: Cms; infos: Infos; CODE: string }) {
  // !todo hook buttons
  // const rbu = document.querySelector(`a[href="#magnet-links"]`) as HTMLElement;
  // console.log(rbu);
  // const rbuRef = useRef<HTMLElement>(rbu);
  // rbuRef.current.click();

  const gmShowPanel = GM_getValue("gmShowPanel", true);

  const [showPanel, setShowPanel] = useState(gmShowPanel);

  const gmSiteList = GM_getValue("gmSiteList", siteList);
  /**  禁用 disable  */
  const siteListFilter = gmSiteList.filter(
    (item) => item.disableHostname !== cms.name && !item.disable,
  );

  const [siteLists, setSiteLists] = useState<RenderSiteItem[]>(
    siteListFilter.map((item) => ({
      name: item.name,
      targetLink: item.url.replace("{{code}}", CODE),
      status: { isSuccess: "pedding", hasSubtitle: false, hasLeakage: false },
    })),
  );
  useEffect(() => {
    gmSiteList.forEach(async (siteItem, index) => {
      const targetLink = siteItem.url.replace("{{code}}", CODE);
      const result = await xhr(siteItem, targetLink, CODE);
      siteLists[index] = {
        name: siteItem.name,
        targetLink,
        status: {
          isSuccess: result.isSuccess ? "fulfilled" : "rejected",
          hasLeakage: result.hasLeakage,
          hasSubtitle: result.hasSubtitle,
        },
      };
      setSiteLists([...siteLists]);
    });
  }, [xhr, setSiteLists]);

  return (
    <>
      {showPanel && (
        <div className="jop-panel">
          <div className="jop-list">
            {siteLists.map((item) => (
              <SiteButton itemData={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
});

export default App;
