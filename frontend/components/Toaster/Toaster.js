export function Toaster({
  iconSrc,
  type = "success",
  title = "Sucesso!",
  message = "",
  onClose,
}) {
  // Cria o elemento div
  const toaster = document.createElement("div");

  // Adiciona a imagem se a propriedade iconSrc for definida
  if (iconSrc) {
    const img = document.createElement("img");
    img.setAttribute("src", iconSrc);
    toaster.appendChild(img);
  }

  // Cria o título
  const titleElement = document.createElement("h2");
  titleElement.innerHTML = title;

  // Cria a mensagem
  const messageElement = document.createElement("p");
  messageElement.innerHTML = message;

  // Cria o botão de fechar
  const closeIcon = document.createElement("img");
  closeIcon.setAttribute("src", "../assets/close.svg");
  closeIcon.classList.add("toaster-close-icon");

  // Adiciona o evento de fechar
  closeIcon.addEventListener("click", onClose);

  // Define as classes de estilo
  const stylesByType = {
    success: "toaster-success",
    warning: "toaster-warning",
  };

  const toasterClass = stylesByType[type] || stylesByType["success"];
  toaster.classList.add(toasterClass);

  // Adiciona os elementos ao toaster
  toaster.appendChild(closeIcon);
  toaster.appendChild(titleElement);
  toaster.appendChild(messageElement);

  return toaster;
}
