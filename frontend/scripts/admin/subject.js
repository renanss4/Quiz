// Importação dos componentes e funções necessárias
import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Box } from "../../components/Box/Box.js";
import { Header } from "../../components/Header/Header.js";
import { Button } from "../../components/Button/Button.js";
import { Table } from "../../components/Table/Table.js";
import { fetchSubjects, deleteSubject } from "../fetch.js";

// Inicialização da sidebar e adição ao DOM
const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [
    {
      iconSrc: "../../assets/house.svg",
      text: "Dashboard",
      link: "admin-dashboard.html",
    },
  ],
});
nav.appendChild(sidebar);

// botões de editar e excluir pegando o id da disciplina
const editButton = (id) =>
  Button({
    type: "link",
    text: "Editar",
    link: `subject-edit.html?id=${id}`,
  });

const deleteButton = (id) =>
  Button({
    type: "link",
    text: "Excluir",
    onClick: async (event) => {
      event.preventDefault(); // Impede o comportamento padrão do link

      const confirmDelete = confirm(
        "Tem certeza que deseja excluir esta disciplina?"
      );
      if (!confirmDelete) {
        return;
      }

      try {
        await deleteSubject(id); // Exclui o assunto
        alert("Disciplina excluída com sucesso!");
        window.location.reload(); // Recarrega a página para atualizar a tabela
      } catch (error) {
        alert("Erro ao excluir disciplina: " + error.message);
      }
    },
  });

const countQuizzes = (quiz) => {
  return quiz.length || 0;
};

// Função para renderizar a tabela dinamicamente com os dados das disciplinas
async function renderTable() {
  try {
    const response = await fetchSubjects();
    console.log(response);

    if (Array.isArray(response)) {
      const subjects = response;
      const rows = subjects.map((subject) => [
        subject.name,
        subject.teacher_id ? subject.teacher_id.name : "Sem professor",
        countQuizzes(subject.quizzes),
        editButton(subject._id), // Botão de editar
        deleteButton(subject._id), // Botão de excluir
      ]);

      const tableDiv = document.querySelector(".table-subject");
      const table = Table({
        headers: ["Nome", "Professor", "Quiz", "Ações"],
        rows: rows,
      });

      tableDiv.innerHTML = ""; // Limpa o conteúdo anterior
      tableDiv.appendChild(table);
    }
  } catch (error) {
    console.error("Failed to render table:", error);
  }
}

// Criação do botão de criar nova disciplina
const buttonDiv = document.createElement("div");
buttonDiv.classList.add("button-create");
const buttonCreate = Button({
  type: "default",
  size: "normal",
  imgSrc: "../../assets/create.svg",
  text: "Cadastrar",
  onClick: () => (window.location.href = "subject-create.html"),
});
buttonDiv.appendChild(buttonCreate);

// Criação do container da tabela
const tableDiv = document.createElement("div");
tableDiv.classList.add("table-subject");

// função que conta quantas disciplinas tem cadastradas
async function countSubjects() {
  try {
    const subjects = await fetchSubjects();
    if (subjects.length > 0) {
      const subtitle = document.querySelector("h2");
      subtitle.innerHTML = `${subjects.length} Disciplinas Cadastradas`;
    }
  } catch (error) {
    console.error("Failed to count subjects:", error);
  }
}
countSubjects();

// Criação do header
const headerElement = Header({
  title: "Disciplinas",
  subtitle: "Nenhuma disciplina cadastrada",
  btnBack: true,
  linkBack: "admin-dashboard.html",
});

// Criação do box que contém o header, o botão e a tabela
const box = Box({
  children: [headerElement, buttonDiv, tableDiv],
});

// Adição do box ao conteúdo principal
const mainContent = document.querySelector(".main-content");
mainContent.appendChild(box);

// Chamada da função para renderizar a tabela
renderTable();
