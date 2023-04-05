import { StateUpdater, useState } from "preact/hooks";
import { SiteItem } from "@/utils/siteList";

const Setting = ({
  siteList,
  setDisables,
  disables,
}: {
  siteList: SiteItem[];
  setDisables: StateUpdater<Set<string>>;
  disables: Set<string>;
}) => {
  const [showSetting, setShowSetting] = useState(false);

  const changeCheck = (item: SiteItem, isHidden: boolean) => {
    if (isHidden) {
      disables.delete(item.name);
    } else {
      disables.add(item.name);
    }
    const newDis = new Set(disables);
    setDisables(newDis);
  };

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
              {siteList.map((item) => {
                const isHidden = disables.has(item.name);
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
            收起设置
          </div>
        </>
      )}
    </>
  );
};

export default Setting;
