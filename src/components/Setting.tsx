import { Dispatch, StateUpdater, useState } from "preact/hooks";
import { SiteItem } from "@/utils/siteList";
import Checkbox from "./Checkbox";

const Setting = ({
  siteList,
  setDisables,
  disables,
}: {
  siteList: SiteItem[];
  setDisables: Dispatch<StateUpdater<string[]>>;
  disables: SiteItem["name"][];
}) => {
  const [showSetting, setShowSetting] = useState(true);

  const hanleListChange = (item: SiteItem, isHidden: boolean) => {
    if (isHidden) {
      setDisables(disables.filter((disItem) => disItem !== item.name));
    } else {
      setDisables([...disables, item.name]);
    }
  };

  return (
    <>
      {!showSetting && (
        <div className="jop-button_def" onClick={() => setShowSetting(!showSetting)}>
          设置
        </div>
      )}
      {showSetting && (
        <>
          <div className="jop-setting">
            <Group title="勾选默认显示的网站：">
              {siteList.map((item) => {
                const isHidden = disables.includes(item.name);
                return (
                  <Checkbox
                    label={item.name}
                    value={!isHidden}
                    onChange={(checked) => hanleListChange(item, checked)}
                  />
                );
              })}
            </Group>
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

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <>
      <h4 className="jop-setting-title">{title}</h4>
      <div className="jop-setting-list">{children}</div>
    </>
  );
};

export default Setting;
