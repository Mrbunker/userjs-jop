import { memo } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { xhrMain } from "../utils/xhr";
import { Cms } from "../utils/matchList";
import { siteList } from "../utils/siteList";
import Info, { Infos } from "./Info";
import SiteButton from "./SiteButton";
import CloseBtn from "./CloseBtn";

export type RenderSiteItem = {
  name: string;
  targetLink: string;
  status: {
    isSuccess: "pedding" | "rejected" | "fulfilled";
    hasSubtitle: boolean;
    hasLeakage: boolean;
  };
};

/** Panel 就是根组件了… */
const Panel = memo(function ({ cms, infos, CODE }: { cms: Cms; infos: Infos; CODE: string }) {
  const [showPanel, setShowPanel] = useState(true);

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
    const awaitSiteList = xhrMain(CODE, initSiteList);
    Promise.all(awaitSiteList).then((resList) => {
      console.log("fulfilled", resList);
      setRenderSiteList(resList);
    });
  }, []);

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
      <CloseBtn
        showPanel={showPanel}
        setShowPanel={setShowPanel}
      />
    </>
  );
});

export default Panel;
