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
  const [multipleNavi, setMultipleNavi] = useState(GM_getValue<boolean>("multipleNavi", true));

  return (
    <>
      <div class="jop-list">
        {siteList
          .filter(
            (siteItem) =>
              !disables.includes(siteItem.name) && libItem.name !== siteItem.disableLibItemName,
          )
          .map((siteItem) => (
            <SiteBtn
              siteItem={siteItem}
              CODE={CODE}
              key={siteItem.name}
              multipleNavi={multipleNavi}
            />
          ))}
      </div>

      <Setting
        siteList={siteList}
        setDisables={(disable) => {
          setDisables(disable);
          GM_setValue("disable", disable);
        }}
        multipleNavi={multipleNavi}
        setMultipleNavi={(multipleNavi) => {
          setMultipleNavi(multipleNavi);
          GM_setValue("multipleNavi", multipleNavi);
        }}
        disables={disables}
      />
    </>
  );
});

export default App;
