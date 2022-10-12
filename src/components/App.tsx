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

  /**  禁用 disable  */
  const initSiteList = siteList.filter((item) => item.disable !== cms.name);

  const [renderSiteList, setRenderSiteList] = useState<RenderSiteItem[]>(
    initSiteList.map((item) => ({
      name: item.name,
      targetLink: item.url.replace("{{code}}", CODE),
      status: { isSuccess: "pedding", hasSubtitle: false, hasLeakage: false },
    })),
  );

  useEffect(() => {
    initSiteList.forEach(async (siteItem, index) => {
      const targetLink = siteItem.url.replace("{{code}}", CODE);
      const result = await xhr(siteItem, targetLink, CODE);
      renderSiteList[index] = {
        name: siteItem.name,
        targetLink,
        status: {
          isSuccess: result.isSuccess ? "fulfilled" : "rejected",
          hasLeakage: result.hasLeakage,
          hasSubtitle: result.hasSubtitle,
        },
      };
      setRenderSiteList([...renderSiteList]);
    });
  }, [xhr, setRenderSiteList]);

  // }, []);
  return (
    <>
      {showPanel && (
        <div className="jop-panel">
          <Info infos={infos} />
          <div className="jop-list">
            {renderSiteList.map((item) => {
              return <SiteButton itemData={item} />;
            })}
          </div>
        </div>
      )}
      <Top
        showPanel={showPanel}
        setShowPanel={setShowPanel}
      />
    </>
  );
});

export default App;
