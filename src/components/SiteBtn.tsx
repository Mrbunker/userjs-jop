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
  const originLink = siteItem.url.replace("{{code}}", formatCode);

  const [loading, setLoading] = useState(false);
  const [fetchRes, setFetchRes] = useState<FetchResult>();

  useEffect(() => {
    setLoading(true);
    fetcher({ siteItem, targetLink: originLink, CODE: formatCode }).then((res) => {
      setFetchRes(res);
      setLoading(false);
    });
  }, [fetcher, siteItem, CODE, originLink]);

  const multipleFlag = multipleNavi && fetchRes?.multipleRes;
  const tag = multipleFlag ? "多结果" : fetchRes?.tag;
  const resultLink = multipleFlag ? originLink : fetchRes?.resultLink;
  const colorClass = fetchRes?.isSuccess ? "jop-button_green " : "jop-button_red ";

  if (hiddenError && !fetchRes?.isSuccess) {
    return <></>;
  }
  return (
    <a
      className={"jop-button " + (loading ? " " : colorClass)}
      target="_blank"
      href={!resultLink ? originLink : resultLink}
    >
      {tag && <div className="jop-button_label">{tag}</div>}

      {/* 加载动画 */}
      {/* {isSuccess === "pedding" && <span className="jop-loading"> </span>} */}
      <span>{name}</span>
    </a>
  );
};

export default SiteBtn;
