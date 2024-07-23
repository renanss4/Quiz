export function Box({ type = "main", children = [] }) {
  if (type != "main") {
    return null;
  }

  const box = document.createElement("main");
  box.classList.add("box");

  const stylesByType = {
    default: "default",
  };

  const boxClass = stylesByType[type];
  box.classList.add(boxClass);

  children.forEach((item) => {
    box.appendChild(item);
  });

  return box;
}
