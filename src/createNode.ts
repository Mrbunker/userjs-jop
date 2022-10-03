export function createPanel() {
  const parentNode = document.querySelector("body");
  const panelNode = document.createElement("div");
  parentNode && parentNode.appendChild(panelNode);
  panelNode.classList.add("jop-panel");
  panelNode.addEventListener("click", () => {
    const class1 = panelNode.classList[1];
    if (class1 === undefined) {
      panelNode.classList.add("jop-panel_open");
    } else {
      panelNode.classList.remove("jop-panel_open");
    }
  });

  return panelNode;
}

export function createButtonNode(panelNode: HTMLDivElement, siteName: string, siteUrl: string) {
  const button = document.createElement("a");
  button.setAttribute("target", "_blank");
  button.classList.add("jop-button");
  button.innerHTML = siteName;
  /** 先给上默认链接 */
  button.href = siteUrl;
  button.addEventListener("click", (e) => e.stopPropagation());
  panelNode.appendChild(button);

  /** 加载动画 */
  const loadAni = document.createElement("span");
  loadAni.classList.add("jop-button-loading");
  button.appendChild(loadAni);

  /** 设置按钮状态样式 */ const setButtonStatus = (
    targetLink: string,
    color: "red" | "green",
    hasLeakage = false,
    hasSubtitle = false,
  ) => {
    button.href = targetLink;

    button.classList.add(`jop-button_${color}`);
    loadAni.classList.remove("jop-button-loading");
    hasLeakage && button.classList.add("jop-button_leakage");
    hasSubtitle && button.classList.add("jop-button_subtitle");
  };

  return { button, setButtonStatus };
}
