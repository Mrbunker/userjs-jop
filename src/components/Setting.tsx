import { StateUpdater, useState, useCallback } from "preact/hooks";
import { SiteItem } from "@/utils/siteList";

const Setting = ({
  sites,
  setDisables,
  disables,
}: {
  sites: SiteItem[];
  setDisables: StateUpdater<string[]>;
  disables: SiteItem["name"][];
}) => {
  const [showSetting, setShowSetting] = useState(false);

  const changeCheck = useCallback(
    (item: SiteItem, isHidden: boolean) => {
      if (isHidden) {
        setDisables(disables.filter((disItem) => disItem !== item.name));
      } else {
        setDisables([...disables, item.name]);
      }
    },
    [sites],
  );

  return (
    <>
      {!showSetting ? (
        <div
          className="jop-button_def"
          onClick={() => {
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
              {sites.map((item) => {
                const isHidden = disables.includes(item.name);
                return (
                  <div
                    className="jop-setting-item"
                    onClick={() => {
                      changeCheck(item, isHidden);
                    }}
                  >
                    {item.name}
                    <input type="checkbox" className="jop-setting-checkbox" checked={!isHidden} />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="jop-button_def"
            onClick={() => {
              setShowSetting(!showSetting);
            }}
          >
            保存
          </div>
        </>
      )}
    </>
  );
};

export default Setting;
