import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { fetchDataUser, fetchSubjects } from "../fetch.js";

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [
    // { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "#" },
    // { iconSrc: "../../assets/books.svg", text: "Painel", link: "#" },
  ],
});
nav.appendChild(sidebar);

async function welcomeMessage() {
  const data = await fetchDataUser();
  return `Bem vindo, ${data.name}!`;
}

async function loadAndDisplayContent() {
  const header = Header({
    title: "Dashboard",
    subtitle: await welcomeMessage(),
    btnBack: false,
    linkBack: "#",
  });

  const section = document.createElement("section");
  const titleSubjects = document.createElement("h3");
  titleSubjects.classList.add("painel");
  titleSubjects.textContent = "Disciplinas";
  section.appendChild(titleSubjects);

  const teacher = await fetchDataUser();
  const subjects = await fetchSubjects();

  const filteredSubjects = subjects.filter((subject) => {
    return subject.teacher_id && subject.teacher_id.name === teacher.name;
  });

  filteredSubjects.forEach((subject) => {
    const btn = document.createElement("button");
    btn.textContent = subject.name;
    btn.onclick = () => {
      window.location.href = `subject.html?id=${subject._id}`;
    };
    section.appendChild(btn);
  });

  const divSpace = document.createElement("div");
  divSpace.classList.add("space");
  divSpace.style.padding = "1.5rem";

  const box = Box({
    children: [header, section, divSpace],
  });

  const main = document.querySelector(".main-content");
  main.appendChild(box);
}

// Chama a função para carregar e exibir o conteúdo
loadAndDisplayContent();
