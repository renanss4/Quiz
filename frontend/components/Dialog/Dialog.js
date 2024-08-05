import { Button } from "../Button/Button.js";

export function Dialog({ title, message, buttons = [] }) {
  const dialog = document.createElement("div");
  dialog.classList.add("dialog");

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;
  titleElement.classList.add("dialog-title");

  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageElement.classList.add("dialog-message");

  const divBtn = document.createElement("div");
  divBtn.classList.add("dialog-buttons");

  buttons.forEach((button) => {
    const btn = Button({
      type: button.type,
      size: button.size,
      text: button.text,
      onClick: button.onClick,
    });

    divBtn.appendChild(btn);
  });

  dialog.appendChild(titleElement);
  dialog.appendChild(messageElement);
  dialog.appendChild(divBtn);

  return dialog;
}
