import { Button } from "../components/Button/Button.js";
import { Input } from "../components/Input/Input.js";
import { Toaster } from "../components/Toaster/Toaster.js";
import { Select } from "../components/Select/Select.js";
import { Tag } from "../components/Tag/Tag.js";
import { Header } from "../components/Header/Header.js";
import { CardItem } from "../components/CardItem/CardItem.js";
import { Optional } from "../components/Optional/Optional.js";
import { Card } from "../components/Card/Card.js";
import { Dialog } from "../components/Dialog/Dialog.js";
import { Table } from "../components/Table/Table.js";
import { SideBar } from "../components/SideBar/SideBar.js";
import { Box } from "../components/Box/Box.js";

function teste() {
  alert("Você clicou no botão!");
}

document.addEventListener("DOMContentLoaded", () => {
  // const body = document.querySelector("body");
  const app = document.getElementById("app");
  const main = document.getElementById("main");

  // body.appendChild(app);
  // body.appendChild(main);

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

  // Adiciona toasters
  const toasters = [
    {
      iconSrc: "../assets/success.svg",
      type: "success",
      title: "Sucesso!",
      message: "Ação realizada com sucesso.",
      onClose: () => {
        console.log("Fechou o toaster");
      },
    },
    {
      iconSrc: "../assets/warning.svg",
      type: "warning",
      title: "Atenção!",
      message: "Ação não permitida.",
    },
  ];

  // toasters.forEach((toasterConfig) => {
  //   const toaster = Toaster({
  //     ...toasterConfig,
  //     onClose: () => {
  //       console.log("Fechou o toaster");
  //     },
  //   });
  //   app.appendChild(toaster);
  // });

  // Adiciona selects
  const selectConfigs = [
    {
      id: "teacher",
      name: "teacher",
      required: true,
      options: [
        { value: "none", label: "Não possui professor" },
        { value: "1", label: "Jojo" },
        { value: "2", label: "Ana" },
      ],
      value: "",
      onChange: (e) => {
        console.log(e.target.value);
      },
    },
  ];

  selectConfigs.forEach((selectConfig) => {
    const selectElement = Select(selectConfig);
    app.appendChild(selectElement);
  });

  // Adiciona tags
  const tags = [
    { value: "1", text: "Simulado" },
    { value: "2", text: "Prova" },
    { value: "3", text: "Avaliação" },
  ];

  // tags.forEach((tagConfig) => {
  //   const tag = Tag(tagConfig);
  //   app.appendChild(tag);
  // });

  // Adiciona header
  // const header = Header({
  //   title: "Título",
  //   subtitle: "Subtítulo",
  //   // btnBack: true,
  //   linkBack: "#",
  // });

  // app.appendChild(header);

  // Adiciona cardItem
  const cardItems = [
    {
      question: "Qual a capital do Brasil?",
      answer: "B",
      type: "default",
    },
    {
      question: "Qual a capital da Argentina?",
      answer: "B",
      type: "error",
    },
  ];

  // cardItems.forEach((cardItemsConfig) => {
  //   const cardItem = CardItem(cardItemsConfig);
  //   app.appendChild(cardItem);
  // });

  // Adiciona optional
  // const optional = Optional({ info: "Informação opcional" });
  // app.appendChild(optional);

  // Adiciona card
  const cards = [
    {
      type: "empty",
      title: "Suas Tentativas",
      cardItems: [],
    },
    {
      type: "attempts",
      title: "Suas Tentativas",
      cardItems: [
        { question: "1ª Tentativa", answer: "8/10", type: "default" },
        { question: "2ª Tentativa", answer: "7/10", type: "error" },
      ],
    },
    {
      type: "answers",
      title: "Respostas",
      cardItems: [
        { question: "Pergunta 1", answer: "A" },
        { question: "Pergunta 2", answer: "C" },
        { question: "Pergunta 3", answer: "D" },
        { question: "Pergunta 4", answer: "B" },
      ],
    },
    {
      type: "template",
      title: "Nota 8",
      cardItems: [
        { question: "Pergunta 1", answer: "A" },
        { question: "Pergunta 2", answer: "B", type: "error" },
        { question: "Pergunta 3", answer: "D" },
        { question: "Pergunta 4", answer: "B" },
      ],
    },
  ];

  // cards.forEach((cardConfig) => {
  //   const card = Card(cardConfig);
  //   app.appendChild(card);
  // });

  // Adiciona dialog
  const dialogs = [
    {
      type: "confirm",
      title: "Tem certeza?",
      message:
        "Lorem ipsum dolor sit amet consectetur. Elementum integer ac mauris fermentum neque sodales mi cursus.",
    },
    {
      type: "alert",
      title: "Pergunta de ação!",
      message:
        "Lorem ipsum dolor sit amet consectetur. Elementum integer ac mauris fermentum neque sodales mi cursus.",
    },
    {
      type: "toaster",
      title: "Entregue!",
      message:
        "O quiz 'Simulado Prova 1' foi entregue com sucesso. Deseja realmente excluir?",
    },
  ];

  // dialogs.forEach((dialogConfig) => {
  //   const dialog = Dialog(dialogConfig);
  //   app.appendChild(dialog);
  // });

  const button1 = Button({
    type: "link",
    size: "none",
    text: "Editar",
    onClick: teste,
  });

  // Adiciona table
  // Defina os cabeçalhos e os dados da tabela
  const headers = ["Name", "Age", "Occupation", "Actions"];
  const rows = [
    [
      "Alice",
      30,
      "Engineer",
      button1,
      Button({ type: "link", size: "none", text: "Excluir", onClick: teste }),
    ],
    [
      "Bob",
      25,
      "Designer",
      Tag({ value: "1", text: "Simulado" }),
      "AFYASIUÇJD",
    ],
    ["Charlie", 35, "Teacher"],
  ];

  // Crie a tabela
  const table = Table(headers, rows);
  // app.appendChild(table);

  // Adiciona sidebar
  const sideBar = SideBar({
    itens: [
      { iconSrc: "../assets/house.svg", text: "Dashboard", link: "#" },
      { iconSrc: "../assets/books.svg", text: "Disciplinas", link: "#" },
    ],
  });

  // app.appendChild(sideBar);

  // Adiciona box
  const box = Box({
    type: "main",
    children: [
      Header({ title: "1", subtitle: "2" }),
      // { type: "main", content: "Conteúdo" },
      // { type: "footer", content: "Rodapé" },
    ],
  });

  // main.appendChild(box);
});
