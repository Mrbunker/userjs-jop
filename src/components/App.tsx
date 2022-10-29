import { memo, useState } from "preact/compat";
import { SiteItem, siteList } from "@/utils/siteList";
import { GM_getValue } from "$";
import type { Current } from "@/utils/matchList";
import SiteButton from "./SiteButton";
import { Setting } from "./Setting";

const App = memo(function ({ current, CODE }: { current: Current; CODE: string }) {
  const disable = GM_getValue<SiteItem["name"][]>("disable", ["AvJoy", "baihuse", "AV01"]);

  // sites 最原始的 siteList.json
  const [sites, setSites] = useState(siteList);

  /**  禁用 hostname  */
  const sitesDisHost = sites.filter(
    (item) => item.disableHostname !== current.name && !item.disable,
  );

  /** 禁用 用户自定义 */
  const filter = sitesDisHost.filter((item) => {
    if (!disable.includes(item.name)) return item;
  });

  return (
    <>
      <div class="jop-list">
        {filter.map((item) => (
          <SiteButton siteItem={item} CODE={CODE} />
        ))}
      </div>
      <div>
        <Setting sites={sites} setSites={setSites} disable={disable} />
      </div>
    </>
  );
});

export default App;
