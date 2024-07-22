export function Button({
  type = "default",
  size = "medium",
  text = "",
  link = null,
  imgSrc = null,
  onClick = () => {},
}) {
  // Cria o elemento button ou a
  const element = link
    ? document.createElement("a")
    : document.createElement("button");

  // Define o texto do botão
  // const span = document.createElement("span");
  // span.textContent = text;

  element.textContent = text;

  // Adiciona a imagem se a propriedade imgSrc for definida
  if (imgSrc) {
    const img = document.createElement("img");
    img.setAttribute("src", imgSrc);
    element.appendChild(img);
  }

  // element.appendChild(span);

  // Define as classes de estilo
  const stylesByType = {
    default: "button-default",
    outline: "button-outline",
    destructive: "button-default-destructive",
    "destructive-outline": "button-outline-destructive",
    link: "button-link",
    "link-sidebar": "button-link-sidebar",
  };

  const btnClass = stylesByType[type];
  if (btnClass) {
    element.classList.add(btnClass);
  }

  const btnsSize = {
    full: "size-full",
    large: "size-large",
    medium: "size-medium",
    small: "size-small",
  };

  const btnSize = btnsSize[size];
  if (btnSize) {
    element.classList.add(btnSize);
  }

  // Adiciona a propriedade href se for um link
  if (link) {
    element.setAttribute("href", link);
    // element.setAttribute("role", "button"); // Opcional, para acessibilidade
  } else {
    element.addEventListener("click", onClick);
  }

  return element;
}
