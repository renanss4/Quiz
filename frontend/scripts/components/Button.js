function Button({ title = "Button", icon = false, type = "default", link = null, onClick }) {
  const button = link ? document.createElement("a") : document.createElement("button");

  button.textContent = icon ? `${icon} ${title}` : title;

  if (link) {
    button.href = link;
    button.onclick = onClick ? (e) => { e.preventDefault(); onClick(); } : null;
  } else {
    button.onclick = onClick;
  }

  const baseClass = "button";
  let typeClass;

  switch (type) {
    case "outline":
      typeClass = "button-outline";
      break;
    case "destructive":
      typeClass = "button-default-destructive";
      break;
    case "destructive-outline":
      typeClass = "button-outline-destructive";
      break;
    default:
      typeClass = "button-default";
      break;
  }

  button.classList.add(baseClass, typeClass);

  return button;
}
