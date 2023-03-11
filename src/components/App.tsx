import { memo, useState } from "preact/compat";
import Setting from "./Setting";
import SiteBtn from "./SiteBtn";
import { GM_getValue, GM_setValue } from "$";
import { SiteItem, siteList } from "@/utils/siteList";
import type { Current } from "@/utils/matchList";

const App = memo(function ({ current, CODE }: { current: Current; CODE: string }) {
  const defDisables = ["AvJoy", "baihuse", "GGJAV", "AV01", "JavBus", "JavDB", "JAVLib"];
  /** 默认不显示的站 */
  const [disables, setDisables] = useState(GM_getValue<SiteItem["name"][]>("disable", defDisables));

  return (
    <>
      <div class="jop-list">
        {siteList.map((item) => {
          const hidden = disables.find((disItem) => disItem === item.name) === undefined;
          if (hidden && current.name !== item.disableHostname) {
            return <SiteBtn siteItem={item} CODE={CODE} key={item.name} />;
          } else {
            return <></>;
          }
        })}
      </div>

      <div>
        <Setting
          siteList={siteList}
          setDisables={(disable) => {
            setDisables(disable);
            GM_setValue("disable", disable);
          }}
          disables={disables}
        />
      </div>
    </>
  );
});

export default App;
