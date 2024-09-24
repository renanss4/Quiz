import { fetchDataUser } from "../fetch.js";
import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";

// Sidebar
const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [
    // { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "#" },
    // { iconSrc: "../../assets/books.svg", text: "Painel", link: "#" },
  ],
});

nav.appendChild(sidebar);

// Função para exibir a mensagem de boas-vindas
async function welcomeMessage() {
  const data = await fetchDataUser();
  return `Bem-vindo, ${data.name}!`;
}

const headerDiv = document.querySelector(".title");

async function createHeader() {
  const message = await welcomeMessage();
  const header = Header({
    title: "Dashboard",
    subtitle: message,
  });

  headerDiv.appendChild(header);
}

createHeader();

// Função de redirecionamento dos botões
document.querySelector("#student").addEventListener("click", () => {
  window.location.href = "./student.html";
});

document.querySelector("#teacher").addEventListener("click", () => {
  window.location.href = "./teacher.html";
});

document.querySelector("#subject").addEventListener("click", () => {
  window.location.href = "./subject.html";
});
