import { SiteItem } from "@/utils/siteList";
import { StateUpdater, useState } from "preact/hooks";
import { GM_setValue } from "vite-plugin-monkey/dist/client";

export const Setting = ({
  sites,
  setSites,
  disable,
}: {
  sites: SiteItem[];
  setSites: StateUpdater<SiteItem[]>;
  disable: SiteItem["name"][];
}) => {
  const [showSetting, setShowSetting] = useState(false);
  return (
    <>
      {!showSetting ? (
        <div
          className="jop-button_def"
          onClick={(e) => {
            setShowSetting(!showSetting);
          }}
        >
          设置
        </div>
      ) : (
        <h4 className="jop-setting-title">勾选默认显示的网站</h4>
      )}
      {showSetting && (
        <>
          <div className="jop-setting">
            <div className="jop-setting-list">
              {sites.map((item, index) => (
                <div className="jop-setting-item">
                  {item.name}
                  <input
                    type="checkbox"
                    className="jop-setting-checkbox"
                    checked={!disable.includes(item.name)}
                    onChange={(e: any) => {
                      const checked: boolean = e.target?.checked;
                      sites[index].disable = !checked;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className="jop-button_def"
            onClick={(e) => {
              setShowSetting(!showSetting);
              const newDisable = sites.map((item) => {
                if (item.disable) return item.name;
              });
              GM_setValue("disable", newDisable);
              setSites([...sites]);
            }}
          >
            保存
          </div>
        </>
      )}
    </>
  );
};
