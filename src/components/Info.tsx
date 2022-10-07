import { memo } from "preact/compat";

/** 从原 info panel 抄一点精简的信息 */
export type Infos = {
  codeText: string;
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
        onClick={() => navigator.clipboard.writeText(infos.codeText)}
      >
        {infos.codeText}
      </span>

      <div class="jop-info-actor">
        <a
          class="jop-info-actor-item"
          target="_blank"
          href={infos.actorList[0].link}
        >
          {infos.actorList[0].text}
        </a>
        <span> 等</span>
      </div>

      {/* {info.actorList.map((item, index) => { const length = info.actorList.length; return ( <a href={item.link} style={{ paddingRight: length !== 1 && index !== length - 1 ? 16 : 0 }} > {item.text} </a> ); })} */}
    </div>
  );
});

export default Info;
