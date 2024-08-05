import { fetchDataUser } from "./configs/fetch.js";
import { Sidebar } from "../components/Sidebar/Sidebar.js";
import { Header } from "../components/Header/Header.js";

// Sidebar
const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [
    { iconSrc: "../assets/house.svg", text: "Dashboard", link: "#" },
    { iconSrc: "../assets/books.svg", text: "Painel", link: "#" },
  ],
});

nav.appendChild(sidebar);


// Função para exibir a mensagem de boas-vindas
async function welcomeMessage() {
  const data = await fetchDataUser();
  return `Bem-vindo, ${data.name}!`;
}

// Header
function createHeader() {
  const header = Header({
    title: "Dashboard",
    subtitle: '',
  });

  // Exibir a mensagem de boas-vindas
  welcomeMessage().then((message) => {
    header.querySelector("h2").textContent = message;
  });

  return header;
}

const title = document.querySelector(".title");
const header = createHeader();
title.appendChild(header);

// Função de redirecionamento dos botões
document.querySelector("#student").addEventListener("click", () => {
  window.location.href = "#";
});

document.querySelector("#teacher").addEventListener("click", () => {
  window.location.href = "#";
});

document.querySelector("#subject").addEventListener("click", () => {
  window.location.href = "admin/subject.html";
});
