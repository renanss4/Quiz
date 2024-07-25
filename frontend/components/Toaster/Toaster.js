export function Toaster({
  iconSrc,
  type = "success",
  title = "Sucesso!",
  message = "",
  onClose,
}) {
  // Cria o elemento div
  const toaster = document.createElement("div");
  toaster.classList.add("toaster");

  // Define as classes de estilo
  const stylesByType = {
    success: "toaster-success",
    warning: "toaster-warning",
  };

  const toasterClass = stylesByType[type] || stylesByType["success"];
  toaster.classList.add(toasterClass);

  // Cria o ícone se a propriedade iconSrc for definida
  const iconElement = document.createElement("div");
  iconElement.classList.add("toaster-icon");
  if (iconSrc) {
    const img = document.createElement("img");
    img.setAttribute("src", iconSrc);
    iconElement.appendChild(img);
  }

  // Cria o conteúdo do toaster
  const contentElement = document.createElement("div");
  contentElement.classList.add("toaster-content");

  // Cria o título
  const titleElement = document.createElement("h2");
  titleElement.innerHTML = title;

  // Cria a mensagem
  const messageElement = document.createElement("p");
  messageElement.innerHTML = message;

  // Adiciona o botão de fechar
  const closeIcon = document.createElement("img");
  closeIcon.setAttribute("src", "../assets/close.svg");
  closeIcon.classList.add("toaster-close-icon");
  closeIcon.addEventListener("click", onClose);

  // Adiciona os elementos ao contentElement
  contentElement.appendChild(titleElement);
  contentElement.appendChild(messageElement);

  // Adiciona os elementos ao toaster
  toaster.appendChild(iconElement);
  toaster.appendChild(contentElement);
  toaster.appendChild(closeIcon);

  return toaster;
}
