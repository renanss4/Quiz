import { Button } from "./components/Button.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const button = Button({
    type: "submit",
    onClick: () => {
      console.log("aloo");
    },
    text: "Click me",
  });

  app.appendChild(button);
});
