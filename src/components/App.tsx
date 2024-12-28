import { memo, useState } from "preact/compat";
import Setting from "./Setting";
import SiteBtn from "./SiteBtn";
import { GM_getValue, GM_setValue } from "$";
import { SiteItem, siteList } from "@/utils/siteList";
import type { LibItem } from "@/utils/libSites";

const App = memo(function ({ libItem, CODE }: { libItem: LibItem; CODE: string }) {
  // 默认不显示
  const DEF_DIS = [
    ...["AvJoy", "baihuse", "GGJAV", "AV01", "18sex", "highporn", "evojav", "HAYAV"],
    ...["JavBus", "JavDB", "JAVLib", "MISSAV_", "123av", "javhub", "javgo", "JAVMENU"],
  ];
  const [disables, setDisables] = useState(GM_getValue<SiteItem["name"][]>("disable", DEF_DIS));
  const [multipleNavi, setMultipleNavi] = useState(GM_getValue<boolean>("multipleNavi", true));
  const [hiddenError, setHiddenError] = useState(GM_getValue<boolean>("hiddenError", false));

  const list = siteList.filter(
    (siteItem) => !disables.includes(siteItem.name) && !siteItem.hostname.includes(libItem.name),
  );

  return (
    <>
      <div class="jop-list">
        {list.map((siteItem) => (
          <SiteBtn
            siteItem={siteItem}
            CODE={CODE}
            key={siteItem.name}
            multipleNavi={multipleNavi}
            hiddenError={hiddenError}
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
        hiddenError={hiddenError}
        setHiddenError={(v) => {
          setHiddenError(v);
          GM_setValue("hiddenError", v);
        }}
      />
    </>
  );
});

export default App;
