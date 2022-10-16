import { GM_getValue, GM_setValue } from "$";
import { StateUpdater, useState } from "preact/hooks";
import { RenderSiteItem } from "./App";
import { ListSetting } from "./ListSetting";

const Top = ({
  showPanel,
  setShowPanel,
  siteLists,
  setSiteLists,
}: {
  showPanel: boolean;
  setShowPanel: (showPanel: boolean) => void;
  siteLists: RenderSiteItem[];
  setSiteLists: StateUpdater<RenderSiteItem[]>;
}) => {
  const [showSettingPanel, setShowSettingPanel] = useState(false);
  const gmShowPanel = GM_getValue("gmShowPanel", true);
  const lsjCompatible = GM_getValue("lsjCompatible", false);

  return (
    <div className="jop-top">
      {showPanel && (
        <div
          className="jop-top-setting jop-top-item"
          onClick={(e) => {
            e.stopPropagation();
            setShowSettingPanel(!showSettingPanel);
          }}
        >
          <div className="jop-top-setting-svg jop-top-svgicon">
            <svg
              width="25"
              height="25"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.5 10H35.5"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M27.5 6V14"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M27.5 10L5.5 10"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.5 24H5.5"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.5 20V28"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M43.5 24H21.5"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M41.5 38H35.5"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M27.5 34V42"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M27.5 38H5.5"
                stroke="#333"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
      {/* setting */}
      {showSettingPanel && showPanel && (
        <div className="jop-top-settingPanel">
          <h4 className="jop-setting-title">脚本设置</h4>
          <div className="jop-settingPanel-item">
            默认显示脚本界面
            <input
              type="checkbox"
              className="jop-top-checkbox"
              checked={gmShowPanel}
              onChange={(e: any) => {
                const checked: boolean = e.target.checked;
                GM_setValue("gmShowPanel", checked);
                setShowPanel(checked);
              }}
            />
          </div>
          <div className="jop-settingPanel-item">
            适配 jav 老司机
            <input
              type="checkbox"
              className="jop-top-checkbox"
              checked={lsjCompatible}
              onChange={(e: any) => {
                const checked: boolean = e.target.checked;
                GM_setValue("lsjCompatible", checked);
              }}
            />
          </div>
          {/* <ListSetting
            siteLists={siteLists}
            setSiteLists={setSiteLists}
          /> */}
        </div>
      )}

      <div
        className="jop-top-close jop-top-item jop-top-svgicon"
        onClick={(e) => {
          e.stopPropagation();
          setShowPanel(!showPanel);
        }}
      >
        {showPanel ? (
          <svg
            width="25"
            height="25"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30"
              stroke="#333"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705"
              stroke="#333"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M42 42L6 6"
              stroke="#333"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="25"
            height="25"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 36C35.0457 36 44 24 44 24C44 24 35.0457 12 24 12C12.9543 12 4 24 4 24C4 24 12.9543 36 24 36Z"
              fill="none"
              stroke="#333"
              stroke-width="3"
              stroke-linejoin="round"
            />
            <path
              d="M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z"
              fill="none"
              stroke="#333"
              stroke-width="3"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Top;
