export function Box({ type = "default", children = [] }) {
  const box = document.createElement("main");
  box.classList.add("box");

  const stylesByType = {
    default: "default",
  };

  const boxClass = stylesByType[type];
  if (boxClass) box.classList.add(boxClass);

  children.forEach((item) => {
    box.appendChild(item);
  });

  return box;
}
