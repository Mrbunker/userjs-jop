const CloseBtn = ({
  showPanel,
  setShowPanel,
}: {
  showPanel: boolean;
  setShowPanel: (showPanel: boolean) => void;
}) => {
  return (
    <div
      className="jop-closeBtn"
      onClick={() => setShowPanel(!showPanel)}
    >
      {showPanel ? (
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3569"
          width="30"
          height="30"
        >
          <path
            d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m226.4 573.6L512 410.4 285.6 637.6 240 592l272-272 272 272-45.6 45.6z"
            p-id="3570"
            fill="#707070"
          ></path>
        </svg>
      ) : (
        <svg
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4765"
          width="30"
          height="30"
        >
          <path
            d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m0 640L240 432l45.6-45.6L512 613.6l226.4-226.4 45.6 45.6L512 704z"
            p-id="4766"
            fill="#707070"
          ></path>
        </svg>
      )}
    </div>
  );
};

export default CloseBtn;
