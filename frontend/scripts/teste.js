import { Button } from "../components/Button/Button.js";
import { Input } from "../components/Input/Input.js";

function teste() {
  alert("Você clicou no botão!");
}

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Adiciona botões
  const buttons = [
    { type: "default", size: "full", text: "Clique aqui" },
    { type: "default", size: "medium", text: "Clique aqui" },
    { type: "default", size: "small", text: "Clique aqui" },
    { type: "outline", size: "large", text: "Clique aqui" },
    { type: "outline", size: "medium", text: "Clique aqui" },
    { type: "outline", size: "small", text: "Clique aqui" },
    { type: "destructive", size: "large", text: "Clique aqui" },
    { type: "destructive", size: "medium", text: "Clique aqui" },
    { type: "destructive", size: "small", text: "Clique aqui" },
    { type: "destructive-outline", size: "large", text: "Clique aqui" },
    { type: "destructive-outline", size: "medium", text: "Clique aqui" },
    { type: "destructive-outline", size: "small", text: "Clique aqui" },
    {
      type: "default",
      size: "small",
      text: "Clique aqui",
      imgSrc: "../assets/create.svg",
    },
    { type: "link", text: "Link para o Google", link: "https://google.com" },
    {
      type: "link-sidebar",
      text: "Botão de sidebar",
      link: "https://google.com",
    },
  ];

  // buttons.forEach((buttonConfig) => {
  //   const button = Button({
  //     ...buttonConfig,
  //     onClick: teste,
  //   });
  //   app.appendChild(button);
  // });

  // Adiciona inputs
  const inputs = [
    { type: "email", placeholder: "Digite algo", name: "email" },
    { type: "password", placeholder: "Digite algo", name: "password" },
    { type: "text", placeholder: "Digite algo", name: "text" },
  ];

  // inputs.forEach((inputConfig) => {
  //   const input = Input({
  //     ...inputConfig,
  //     onChange: (e) => {
  //       console.log(e.target);
  //     },
  //   });
  //   app.appendChild(input);
  // });
});
