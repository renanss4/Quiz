import { Button } from "../Button/Button.js";

export function Dialog({ type = "toaster", title, message }) {
  const dialog = document.createElement("div");
  dialog.classList.add("dialog");

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;

  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  const stylesByType = {
    toaster: "dialog-toaster",
    alert: "dialog-alert",
    confirm: "dialog-confirm",
  };

  const dialogClass = stylesByType[type];
  dialog.classList.add(dialogClass);

  const divBtn = document.createElement("div");
  divBtn.classList.add("dialog-buttons");

  let confirmButton = undefined;
  let cancelButton = undefined;
  let link = undefined;

  if (type === "confirm") {
    confirmButton = Button({
      type: "default",
      size: "small",
      text: "Confirmar",
      onClick: () => {
        alert('Você clicou no botão "Confirmar"');
      },
    });
    cancelButton = Button({
      type: "outline",
      size: "small",
      text: "Cancelar",
      onClick: () => {
        alert('Você clicou no botão "Cancelar"');
      },
    });
  } else if (type === "alert") {
    confirmButton = Button({
      type: "destructive",
      size: "small",
      text: "OK",
      onClick: () => {
        alert('Você clicou no botão "OK"');
      },
    });
    cancelButton = Button({
      type: "outline",
      size: "small",
      text: "Cancelar",
      onClick: () => {
        alert('Você clicou no botão "Cancelar"');
      },
    });
  } else if (type === "toaster") {
    const img = document.createElement("img");
    img.setAttribute("src", "../assets/success.svg");
    dialog.appendChild(img);
    link = Button({
      type: "link",
      text: "Ver Gabarito",
      link: "#",
    });
  }

  dialog.appendChild(titleElement);
  dialog.appendChild(messageElement);
  if (confirmButton && cancelButton) {
    divBtn.appendChild(cancelButton);
    divBtn.appendChild(confirmButton);
  } else if (link) {
    divBtn.appendChild(link);
  }

  dialog.appendChild(divBtn);

  return dialog;
}
