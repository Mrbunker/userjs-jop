import { memo } from "preact/compat";

/** 从原 info panel 抄一点精简的信息 */
export type Infos = {
  codeText?: string;
  score?: string;
  actorList: {
    text: string;
    link: string;
    // avatart:string
  }[];
};

const Info = memo(({ infos }: { infos: Infos }) => {
  const { codeText, score, actorList } = infos;
  return (
    <div className="jop-info">
      <span
        className="jop-info-code"
        title="点击复制"
        onClick={() => codeText && navigator.clipboard.writeText(codeText)}
      >
        {codeText ? codeText : "暂无"}
      </span>

      <div className="jop-info-more">
        <span className="jop-info-actor-item">
          {actorList.length !== 0 ? (
            <>
              <a
                className=" jop-tag"
                target="_blank"
                href={actorList[0].link}
              >
                {actorList[0].text}
              </a>
              <span> 等</span>
            </>
          ) : (
            <div>无演员信息</div>
          )}
        </span>
        {score && <span className="jop-tag">{score} 分</span>}
      </div>
    </div>
  );
});

export default Info;
