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

  const topElement = document.createElement("div");
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title-div");
  topElement.classList.add("toaster-top");
  if (iconSrc) {
    const img = document.createElement("img");
    img.setAttribute("src", iconSrc);
    titleDiv.appendChild(img);
  }

  // Cria o título
  const titleElement = document.createElement("h2");
  titleElement.innerHTML = title;
  titleDiv.appendChild(titleElement);

  // Cria a mensagem
  const messageElement = document.createElement("p");
  messageElement.innerHTML = message;

  // Adiciona o botão de fechar
  const closeIcon = document.createElement("img");
  closeIcon.setAttribute("src", "../assets/close.svg");
  closeIcon.classList.add("toaster-close-icon");
  closeIcon.addEventListener("click", onClose);

  topElement.appendChild(titleDiv);

  // Adiciona os elementos ao toaster
  toaster.appendChild(topElement);

  // Adiciona os elementos ao contentElement
  topElement.appendChild(closeIcon);
  toaster.appendChild(messageElement);

  return toaster;
}
