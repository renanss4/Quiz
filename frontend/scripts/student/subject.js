import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { Table } from "../../components/Table/Table.js";
import { Tag } from "../../components/Tag/Tag.js";
import { fetchSubjects, fetchQuizzes } from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const subjectId = urlParams.get("id");

if (!subjectId) {
  alert("ID da disciplina não fornecido");
  window.location.href = "./student-dashboard.html";
}

const subjects = await fetchSubjects();
const subject = subjects.find((subject) => subject._id === subjectId);

const quizzes = await fetchQuizzes();
const subjectQuizzes = subject.quizzes
  .map((subjectQuiz) =>
    quizzes.find((quiz) => quiz._id === subjectQuiz.quiz_id)
  )
  .filter((quiz) => quiz && !quiz.is_draft);

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
});
nav.appendChild(sidebar);

const header = Header({
  title: subject.name,
  subtitle: "Quizzes",
  btnBack: true,
  linkBack: "./student-dashboard.html",
});

// Função que será chamada ao clicar em uma linha da tabela
const handleQuizClick = (quizId) => {
  window.location.href = `quiz-view.html?id=${quizId}`;
};

// Mapeando os quizzes para criar linhas da tabela com comportamentos de clique
const rows = subjectQuizzes.map((quiz) => {
  // Formatar a data
  const date = new Date(quiz.date_end);
  const formattedDate = date.toLocaleDateString("pt-BR");

  // Criar tag de acordo com o tipo de quiz
  let tag;
  if (quiz.type === "test") {
    tag = Tag({
      value: "test",
      text: "Prova",
    });
  } else if (quiz.type === "homework") {
    tag = Tag({
      value: "homework",
      text: "Exercício",
    });
  }

  // Retornar um objeto com o ID do quiz e um array com os dados da linha
  return {
    id: quiz._id,
    data: [quiz.name, formattedDate, tag],
  };
});

const table = Table({
  headers: ["Nome", "Data de Entrega", "Tipo"],
  rows: rows,
  rowClickHandler: (quizId) => handleQuizClick(quizId),
});

const box = Box({
  children: [header, table],
});
document.body.appendChild(box);
