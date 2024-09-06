import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { fetchDataUser, fetchStudentSubjects } from "../fetch.js";

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
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

  const student = await fetchDataUser();
  const enrollment = student.enrollment;

  // relação de alunos com disciplinas já tem os id
  const data = await fetchStudentSubjects({ enrollment });
  data.forEach((subject) => {
    const btn = document.createElement("button");
    btn.textContent = subject.subject_id.name;
    btn.onclick = () => {
      window.location.href = `subject.html?id=${subject.subject_id._id}`;
    };
    section.appendChild(btn);
  });

  const box = Box({
    children: [header, section],
  });

  const main = document.querySelector(".main-content");
  main.appendChild(box);
}

loadAndDisplayContent();
