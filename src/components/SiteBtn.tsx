import { handleFetch, handleFetchJavBle } from "@/utils/xhr";
import { SiteItem } from "@/utils/siteList";
import { memo, useEffect, useState } from "preact/compat";

interface Status {
  isSuccess: "pedding" | "rejected" | "fulfilled";
  hasSubtitle: boolean;
  hasLeakage: boolean;
  targetLink: string;
}
const SiteBtn = memo(({ siteItem, CODE }: { siteItem: SiteItem; CODE: string }) => {
  const { name, codeFormater } = siteItem;
  /** 格式化 CODE */
  const formatCode = codeFormater ? codeFormater(CODE) : CODE;
  const link = siteItem.url.replace("{{code}}", formatCode);

  const [status, setStatus] = useState<Status>({
    isSuccess: "pedding",
    hasSubtitle: false,
    hasLeakage: false,
    targetLink: "",
  });
  const { isSuccess, hasSubtitle, hasLeakage, targetLink } = status;

  useEffect(() => {
    const fetchMethod = name === "Jable" ? handleFetchJavBle : handleFetch;
    fetchMethod(siteItem, link, formatCode).then((res) => {
      setStatus({
        isSuccess: res.isSuccess ? "fulfilled" : "rejected",
        hasSubtitle: res.hasSubtitle,
        hasLeakage: res.hasLeakage,
        targetLink: res.targetLink,
      });
    });
  }, [handleFetch, siteItem, CODE, link]);

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

export default SiteBtn;
