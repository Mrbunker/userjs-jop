import { Dispatch, StateUpdater, useState } from "preact/hooks";
import { GM_setValue } from "$";
import { SiteItem } from "@/utils/siteList";
import Checkbox from "./Checkbox";

type Props = {
  siteList: SiteItem[];
  setDisables: Dispatch<StateUpdater<string[]>>;
  disables: SiteItem["name"][];
  multipleNavi: boolean;
  setMultipleNavi: Dispatch<StateUpdater<boolean>>;
  hiddenError: boolean;
  setHiddenError: Dispatch<StateUpdater<boolean>>;
};

const Setting = ({
  siteList,
  setDisables,
  disables,
  multipleNavi,
  setMultipleNavi,
  hiddenError,
  setHiddenError,
}: Props) => {
  const [showSetting, setShowSetting] = useState(false);

  const hanleListChange = (item: SiteItem, isHidden: boolean) => {
    if (isHidden) {
      setDisables(disables.filter((disItem) => disItem !== item.name));
    } else {
      setDisables([...disables, item.name]);
    }
  };

  const handleNaviChange = (checked: boolean) => {
    setMultipleNavi(checked);
    GM_setValue("multipleNavi", checked);
  };

  const handlehiddenErrorChange = (checked: boolean) => {
    setHiddenError(checked);
    GM_setValue("hiddenError", checked);
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
            <Group title="勾选默认展示">
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

            <Group title="其他设置">
              <Checkbox
                label="展示多个搜索结果"
                value={multipleNavi}
                tip="一个站点内出现多条匹配结果时，打开后跳转搜索结果页"
                onChange={handleNaviChange}
              />
              <Checkbox
                label="隐藏失败结果"
                value={hiddenError}
                onChange={handlehiddenErrorChange}
              />
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
