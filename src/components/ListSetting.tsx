import { StateUpdater } from "preact/hooks";
import { GM_setValue } from "vite-plugin-monkey/dist/client";
import { RenderSiteItem } from "./App";

export const ListSetting = ({
  siteLists,
  setSiteLists,
}: {
  siteLists: RenderSiteItem[];
  setSiteLists: StateUpdater<RenderSiteItem[]>;
}) => {
  return (
    <div>
      {siteLists.map((item, index) => (
        <div className="jop-settingPanel-item jop-">
          {item.name}
          <input
            type="checkbox"
            className="jop-top-checkbox"
            // checked={!item.disable}
            onChange={(e: any) => {
              const checked: boolean = e.target?.checked;
              // siteLists[index].disable = !checked;
              // console.log("|siteLists", siteLists);
              GM_setValue("gmSiteList", siteLists);
              setSiteLists([...siteLists]);
            }}
          />
        </div>
      ))}
    </div>
  );
};
