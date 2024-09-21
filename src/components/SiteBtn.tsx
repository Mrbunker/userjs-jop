import { fetcher, FetchResult } from "@/utils/xhr";
import { SiteItem } from "@/utils/siteList";
import { useEffect, useState } from "preact/compat";

type Props = {
  siteItem: SiteItem;
  CODE: string;
  multipleNavi?: boolean;
  hiddenError?: boolean;
};

const SiteBtn = ({ siteItem, CODE, multipleNavi, hiddenError }: Props) => {
  const { name, codeFormater } = siteItem;
  /** 格式化 CODE */
  const formatCode = codeFormater ? codeFormater(CODE) : CODE;
  const link = siteItem.url.replace("{{code}}", formatCode);

  const [loading, setLoading] = useState(false);
  const [fetchRes, setFetchRes] = useState<FetchResult>();

  useEffect(() => {
    setLoading(true);
    fetcher({ siteItem, targetLink: link, CODE: formatCode }).then((res) => {
      setFetchRes(res);
      setLoading(false);
    });
  }, [fetcher, siteItem, CODE, link]);

  const tag = multipleNavi && fetchRes?.multipleRes ? "多结果" : fetchRes?.tag;
  const resultLink = fetchRes?.multipleRes ? fetchRes.multipResLink : fetchRes?.targetLink;

  const colorClass = fetchRes?.isSuccess ? "jop-button_green " : "jop-button_red ";

  if (hiddenError && !fetchRes?.isSuccess) {
    return <></>;
  }
  return (
    <a
      className={"jop-button " + (loading ? " " : colorClass)}
      target="_blank"
      href={resultLink === "" ? link : resultLink}
    >
      {tag && <div className="jop-button_label">{tag}</div>}

      {/* 加载动画 */}
      {/* {isSuccess === "pedding" && <span className="jop-loading"> </span>} */}
      <span>{name}</span>
    </a>
  );
};

export default SiteBtn;
