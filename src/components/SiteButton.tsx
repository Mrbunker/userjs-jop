import { SiteItem } from "@/utils/siteList";
import xhr from "@/utils/xhr";
import { memo, useEffect, useState } from "preact/compat";
interface Status {
  isSuccess: "pedding" | "rejected" | "fulfilled";
  hasSubtitle: boolean;
  hasLeakage: boolean;
  targetLink: string;
}
const SiteButton = memo(({ siteItem, CODE }: { siteItem: SiteItem; CODE: string }) => {
  const { name } = siteItem;
  const [status, setStatus] = useState<Status>({
    isSuccess: "pedding",
    hasSubtitle: false,
    hasLeakage: false,
    targetLink: "",
  });
  const link = siteItem.url.replace("{{code}}", CODE);
  const { isSuccess, hasSubtitle, hasLeakage, targetLink } = status;

  useEffect(() => {
    xhr(siteItem, link, CODE).then((res) => {
      setStatus({
        isSuccess: res.isSuccess ? "fulfilled" : "rejected",
        hasSubtitle: res.hasSubtitle,
        hasLeakage: res.hasLeakage,
        targetLink: res.targetLink,
      });
    });
  }, [xhr, siteItem, CODE, link]);
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
      href={targetLink === "" ? link : targetLink}
    >
      {(hasSubtitle || hasLeakage) && (
        <div className="jop-button_label">
          {hasSubtitle && <span>字幕 </span>}
          {hasLeakage && <span> 无码</span>}
        </div>
      )}

      {/* 加载动画 */}
      {/* {isSuccess === "pedding" && <span className="jop-loading"> </span>} */}
      <span>{name}</span>
    </a>
  );
});

export default SiteButton;
