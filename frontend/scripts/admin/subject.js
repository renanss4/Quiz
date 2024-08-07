// Importação dos componentes e funções necessárias
import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Box } from "../../components/Box/Box.js";
import { Header } from "../../components/Header/Header.js";
import { Button } from "../../components/Button/Button.js";
import { Table } from "../../components/Table/Table.js";
import { fetchSubjects } from "../fetch.js";

// Inicialização da sidebar e adição ao DOM
const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [
    { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "admin-dashboard.html" },
  ]
});
nav.appendChild(sidebar);

// Função para renderizar a tabela dinamicamente com os dados das disciplinas
async function renderTable() {
  try {
    const subjects = await fetchSubjects();

    const rows = subjects.map(subject => [
      subject.name, 
      subject.teacher_id ? subject.teacher_id.name : "Sem professor",
      0, // Quiz, que ainda não foi implementado, retorna 0
      "Editar", // Placeholder para ação de editar
      "Excluir" // Placeholder para ação de excluir
    ]);

    const tableDiv = document.querySelector(".table-subject");
    const table = Table({
      headers: ["Nome", "Professor", "Quiz", "Ações"],
      rows: rows
    });

    tableDiv.innerHTML = ''; // Limpa o conteúdo anterior
    tableDiv.appendChild(table);
  } catch (error) {
    console.error("Failed to render table:", error);
  }
}

// Criação do botão de criar nova disciplina
const buttonDiv = document.createElement('div');
buttonDiv.classList.add('button-create');
const buttonCreate = Button({
  type: "default",
  size: "normal",
  imgSrc: "../../assets/create.svg",
  text: "Cadastrar",
  onClick: () => window.location.href = "subject-create.html"
});
buttonDiv.appendChild(buttonCreate);

// Criação do container da tabela
const tableDiv = document.createElement('div');
tableDiv.classList.add('table-subject');

// Criação do header
const headerElement = Header({
  title: "Disciplinas",
  subtitle: '0 Disciplinas Cadastradas',
  btnBack: true,
  linkBack: "admin-dashboard.html"
});

// Criação do box que contém o header, o botão e a tabela
const box = Box({
  children: [
    headerElement,
    buttonDiv,
    tableDiv
  ]
});

// Adição do box ao conteúdo principal
const mainContent = document.querySelector(".main-content");
mainContent.appendChild(box);

// Chamada da função para renderizar a tabela
renderTable();
