import { memo, useState } from "preact/compat";
import Setting from "./Setting";
import SiteBtn from "./SiteBtn";
import { GM_getValue, GM_setValue } from "$";
import { SiteItem, siteList } from "@/utils/siteList";
import type { LibItem } from "@/utils/libSites";

const App = memo(function ({ libItem, CODE }: { libItem: LibItem; CODE: string }) {
    // 默认不显示
  const DEF_DIS = [
    ...["AvJoy", "baihuse", "GGJAV", "AV01", "18sex", "highporn"],
    ...["JavBus", "JavDB", "JAVLib", "MISSAV_"],
  ];
  const [disables, setDisables] = useState(GM_getValue<SiteItem["name"][]>("disable", DEF_DIS));

  return (
    <>
      <div class="jop-list">
        {siteList.map((siteItem) => {
          const hidden = disables.find((disItem) => disItem === siteItem.name) === undefined;
          const sameSite = libItem.name !== siteItem.disableLibItemName;
          if (hidden && sameSite) {
            return <SiteBtn siteItem={siteItem} CODE={CODE} key={siteItem.name} />;
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
