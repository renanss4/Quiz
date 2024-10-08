export function Button({
  type = "default",
  size = "normal",
  imgSrc = null,
  text = "",
  link = null,
  onClick = () => {},
}) {
  // Cria o elemento button ou a
  const element = link
    ? document.createElement("a")
    : document.createElement("button");

  element.textContent = text;

  // Adiciona a imagem se a propriedade imgSrc for definida
  if (imgSrc) {
    const img = document.createElement("img");
    img.setAttribute("src", imgSrc);
    element.appendChild(img);
  }

  // Define as classes de estilo
  const stylesByType = {
    default: "button-default",
    outline: "button-outline",
    destructive: "button-default-destructive",
    "destructive-outline": "button-outline-destructive",
    link: "button-link",
  };

  const btnClass = stylesByType[type];
  if (btnClass) {
    element.classList.add(btnClass);
  }

  const btnsSize = {
    full: "size-full",
    mid: "size-mid",
    normal: "size-normal",
  };

  const btnSize = btnsSize[size];
  if (btnSize) {
    element.classList.add(btnSize);
  }

  // Adiciona a propriedade href se for um link
  if (link) {
    element.setAttribute("href", link);
  } else {
    element.addEventListener("click", onClick);
  }

  return element;
}
