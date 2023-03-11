import { memo, useState } from "preact/compat";
import Setting from "./Setting";
import SiteBtn from "./SiteBtn";
import { GM_getValue } from "$";
import { SiteItem, siteList } from "@/utils/siteList";
import type { Current } from "@/utils/matchList";

const App = memo(function ({ current, CODE }: { current: Current; CODE: string }) {
  const defDisables = ["AvJoy", "baihuse", "GGJAV", "AV01", "JavBus", "JavDB", "JAVLib"];
  /** 默认不显示的站 */
  const [disables, setDisables] = useState(GM_getValue<SiteItem["name"][]>("disable", defDisables));

  // sites 最原始的 siteList.json
  const [sites, setSites] = useState(siteList);
  /**  禁用 hostname  */
  const sitesDisHost = sites.filter(
    (item) => item.disableHostname !== current.name && !item.disable,
  );

  /** 禁用 用户自定义 */
  const filter = sitesDisHost.filter((item) => {
    if (!disables.includes(item.name)) return item;
  });

  return (
    <>
      <div class="jop-list">
        {filter.map((item) => (
          <SiteBtn siteItem={item} CODE={CODE} key={item.name} />
        ))}
      </div>
      <div>
        <Setting
          sites={sites}
          setDisables={setDisables}
          // setSites={setSites}
          disables={disables}
        />
      </div>
    </>
  );
});

export default App;
