import { useState } from "preact/hooks";

import { Cms } from "../utils/matchList";
import { siteList } from "../utils/siteList";
import Info, { Infos } from "./Info";

/** Panel 就是根组件了… */
const Panel = function ({ cms, infos }: { cms: Cms; infos: Infos }) {
  /** 禁用部分 */
  const siteListFil = siteList.filter((item) => item.disable !== cms.name);

  const [showPanel, setShowPanel] = useState(true);

  return (
    <>
      <div
        style={{ position: "absolute", zIndex: 11 }}
        onClick={() => setShowPanel(!showPanel)}
      >
        关掉
      </div>
      {showPanel && (
        <div className="jop-panel">
          <Info infos={infos} />
        </div>
      )}
    </>
  );
};

export default Panel;
