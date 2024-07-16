import { Button } from "../components/Button/Button.js";
import { Input } from "../components/Input/Input.js";

function teste() {
  alert("Você clicou no botão!");
}

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const button1 = Button({
    type: "default",
    size: "full",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button2 = Button({
    type: "default",
    size: "medium",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button3 = Button({
    type: "default",
    size: "small",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button4 = Button({
    type: "outline",
    size: "large",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button5 = Button({
    type: "outline",
    size: "medium",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button6 = Button({
    type: "outline",
    size: "small",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button7 = Button({
    type: "destructive",
    size: "large",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button8 = Button({
    type: "destructive",
    size: "medium",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button9 = Button({
    type: "destructive",
    size: "small",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button10 = Button({
    type: "destructive-outline",
    size: "large",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button11 = Button({
    type: "destructive-outline",
    size: "medium",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button12 = Button({
    type: "destructive-outline",
    size: "small",
    text: "Clique aqui",
    // imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button13 = Button({
    type: "default",
    size: "small",
    text: "Clique aqui",
    imgSrc: "../assets/create.svg",
    onClick: teste,
  });

  const button14 = Button({
    type: "link",
    text: "Link para o Google",
    link: "https://google.com",
  });

  const button15 = Button({
    type: "link-sidebar",
    text: "Botão de sidebar",
    link: "https://google.com",
  });

  const input1 = Input({
    type: "select",
    placeholder: "Digite algo",
    value: "",
    onChange: (e) => {
      console.log(e.target.value);
    },
  });
  const input2 = Input({
    type: "number",
    placeholder: "Digite algo",
    value: "",
    onChange: (e) => {
      console.log(e.target.value);
    },
  });

  app.appendChild(input1);
  app.appendChild(input2);
  app.appendChild(button1);
});
