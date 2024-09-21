import { fetcher } from "@/utils/xhr";
import { SiteItem } from "@/utils/siteList";
import { memo, useEffect, useState } from "preact/compat";

interface Status {
  isSuccess: "pedding" | "rejected" | "fulfilled";
  resultLink?: string;
  tag?: string;
}
type Props = {
  siteItem: SiteItem;
  CODE: string;
  multipleNavi?: boolean;
};

const SiteBtn = memo(({ siteItem, CODE, multipleNavi }: Props) => {
  const { name, codeFormater } = siteItem;
  /** 格式化 CODE */
  const formatCode = codeFormater ? codeFormater(CODE) : CODE;
  const link = siteItem.url.replace("{{code}}", formatCode);

  const [status, setStatus] = useState<Status>({
    isSuccess: "pedding",
    tag: "",
    resultLink: "",
  });
  const { isSuccess, tag, resultLink } = status;

  useEffect(() => {
    fetcher({ siteItem, targetLink: link, CODE: formatCode }).then((res) => {
      const resultLink = multipleNavi && res.multipleRes ? res.multipResLink : res.targetLink;

      setStatus({
        isSuccess: res.isSuccess ? "fulfilled" : "rejected",
        tag: multipleNavi && res.multipleRes ? "多结果" : res.tag,
        resultLink,
      });
    });
  }, [fetcher, siteItem, CODE, link, multipleNavi]);

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
      href={resultLink === "" ? link : resultLink}
    >
      {tag && <div className="jop-button_label">{tag}</div>}

      {/* 加载动画 */}
      {/* {isSuccess === "pedding" && <span className="jop-loading"> </span>} */}
      <span>{name}</span>
    </a>
  );
});

export default SiteBtn;
