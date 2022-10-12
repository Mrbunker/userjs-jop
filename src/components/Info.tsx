import { memo } from "preact/compat";

/** 从原 info panel 抄一点精简的信息 */
export type Infos = {
  codeText?: string;
  actorList: {
    text: string;
    link: string;
    // avatart:string
  }[];
};

const Info = memo(({ infos }: { infos: Infos }) => {
  return (
    <div className="jop-info">
      <span
        className="jop-info-code"
        title="点击复制"
        onClick={() => infos.codeText && navigator.clipboard.writeText(infos.codeText)}
      >
        {infos.codeText ? infos.codeText : "暂无"}
      </span>

      <div class="jop-info-actor">
        {infos.actorList.length !== 0 ? (
          <>
            <a
              class="jop-info-actor-item"
              target="_blank"
              href={infos.actorList[0].link}
            >
              {infos.actorList[0].text}
            </a>
            <span> 等</span>
          </>
        ) : (
          <div>无演员信息</div>
        )}
      </div>

      {/* {info.actorList.map((item, index) => { const length = info.actorList.length; return ( <a href={item.link} style={{ paddingRight: length !== 1 && index !== length - 1 ? 16 : 0 }} > {item.text} </a> ); })} */}
    </div>
  );
});

export default Info;
