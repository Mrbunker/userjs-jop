import { memo } from "preact/compat";
import { RenderSiteItem } from "./App";
const SiteButton = memo(({ itemData }: { itemData: RenderSiteItem }) => {
  const { name, targetLink, status } = itemData;
  const { isSuccess, hasSubtitle, hasLeakage } = status;
  const colorClass =
    isSuccess === "pedding"
      ? " "
      : isSuccess === "fulfilled"
      ? "jop-button_green "
      : "jop-button_red ";
  return (
    <a
      className={"jop-button " + colorClass}
      target="_blank"
      href={targetLink}
    >
      {(hasSubtitle || hasLeakage) && (
        <div className="jop-button_label">
          {hasSubtitle && <span>字幕 </span>}
          {hasLeakage && <span> 无码</span>}
        </div>
      )}
      {isSuccess === "pedding" && <span className="jop-loading"> </span>}
      <span>{name}</span>
    </a>
  );
});

export default SiteButton;
