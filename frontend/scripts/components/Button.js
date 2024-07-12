import { createElement } from "../configs/createElement.js";

export function Button({ type, onClick, text }) {
  return createElement(
    "button",
    { class: "btn-login", type: type, onclick: onClick },
    text
  );
  // document.contentType = type
}
