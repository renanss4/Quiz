import { Button } from "../Button/Button.js";

export function Header({ title, subtitle, btnBack = false, linkBack = null }) {
  const header = document.createElement("header");

  const stylesByType = {
    default: "header-default",
    "header-back": "header-back",
  };

  const headerClass = stylesByType[btnBack ? "header-back" : "default"];
  header.classList.add(headerClass);

  const div = document.createElement("div");
  div.classList.add("header-title");

  const h1 = document.createElement("h1");
  h1.textContent = title;

  const h2 = document.createElement("h2");
  h2.textContent = subtitle;

  if (btnBack) {
    const btn = Button({
      type: "link",
      imgSrc: "../../assets/go-back.svg",
      link: linkBack,
    });
    btn.classList.add("btn-back");
    div.appendChild(btn);
    div.appendChild(h1);
    header.appendChild(div);
    header.appendChild(h2);
  } else {
    header.appendChild(h1);
    header.appendChild(h2);
  }

  return header;
}
