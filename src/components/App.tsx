import { memo } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";
import { xhrMain } from "../utils/xhr";
import { Cms } from "../utils/matchList";
import { siteList } from "../utils/siteList";
import Info, { Infos } from "./Info";
import SiteButton from "./SiteButton";
import CloseBtn from "./Top";
import { GM_getValue } from "vite-plugin-monkey/dist/client";
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

  // !todo setting.json
  // GM_registerMenuCommand
  const gmShowPanel = GM_getValue("setting", { gmShowPanel: true }).gmShowPanel;

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
    const awaitSiteList = xhrMain(CODE, initSiteList);
    Promise.all(awaitSiteList).then((list) => {
      console.log("fulfilled", list);
      setRenderSiteList(list);
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
      <Top
        showPanel={showPanel}
        setShowPanel={setShowPanel}
      />
    </>
  );
});

export default App;
