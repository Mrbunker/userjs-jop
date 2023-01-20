import { SiteItem } from "@/utils/siteList";
import { StateUpdater, useState } from "preact/hooks";
import { GM_setValue } from "vite-plugin-monkey/dist/client";

export const Setting = ({
  sites,
  setSites,
  disables: disable,
}: {
  sites: SiteItem[];
  setSites: StateUpdater<SiteItem[]>;
  disables: SiteItem["name"][];
}) => {
  const [showSetting, setShowSetting] = useState(false);
  /** 暂存用户的勾选，最后保存的时候提交 */
  const newDisable = disable;
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
                      if (!checked) {
                        newDisable.push(item.name);
                      } else {
                        newDisable.forEach((name, index) => {
                          if (name === item.name) newDisable.splice(index, 1);
                        });
                      }
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
