import { useState } from "preact/hooks";

interface TooltipProps {
  content: string;
  children: preact.ComponentChildren;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="jop-tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && content && <div className="jop-tooltip">{content}</div>}
    </div>
  );
};

export default Tooltip;
