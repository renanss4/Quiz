import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { Button } from "../../components/Button/Button.js";
import { fetchSubjects, fetchQuizzes } from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const subjectId = urlParams.get("id");

if (!subjectId) {
  alert("ID da disciplina não fornecido");
  window.location.href = "./teacher-dashboard.html";
}

const subjects = await fetchSubjects();
const subject = subjects.find((subject) => subject._id === subjectId);

const quizzes = await fetchQuizzes();

// Combina os quizzes do subject com os quizzes completos retornados pelo fetchQuizzes
const subjectQuizzes = subject.quizzes.map((subjectQuiz) => {
  const fullQuiz = quizzes.find((quiz) => quiz._id === subjectQuiz.quiz_id);
  return {
    ...subjectQuiz,
    is_draft: fullQuiz ? fullQuiz.is_draft : false,
  };
});

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
});
nav.appendChild(sidebar);

const header = Header({
  title: subject.name,
  subtitle: "Quizzes",
  btnBack: true,
  linkBack: "./teacher-dashboard.html",
});

const btnCreateQuiz = Button({
  type: "default",
  text: "Criar Quiz",
  imgSrc: "../../assets/create.svg",
  onClick: () => {
    window.location.href = `quiz-create.html?subject_id=${subject._id}`;
  },
});
btnCreateQuiz.classList.add("btn-create-quiz");

const section = document.createElement("section");
section.classList.add("quiz-section");

const quizzesContainer = document.createElement("div");
quizzesContainer.classList.add("quizzes-container");

const postedQuizzes = document.createElement("div");
postedQuizzes.classList.add("quiz-category");

const titlePostedQuizzes = document.createElement("h3");
titlePostedQuizzes.textContent = "Postados";
postedQuizzes.appendChild(titlePostedQuizzes);

const draftQuizzes = document.createElement("div");
draftQuizzes.classList.add("quiz-category");

const titleDraftQuizzes = document.createElement("h3");
titleDraftQuizzes.textContent = "Rascunhos";
draftQuizzes.appendChild(titleDraftQuizzes);

// Adiciona os quizzes aos contêineres apropriados
subjectQuizzes.forEach((quiz) => {
  const btn = document.createElement("button");
  btn.textContent = quiz.name;
  btn.onclick = () => {
    window.location.href = `quiz-view.html?quiz_id=${quiz.quiz_id}`;
  };
  if (quiz.is_draft) {
    draftQuizzes.appendChild(btn);
  } else {
    postedQuizzes.appendChild(btn);
  }
});

// Adiciona os contêineres ao elemento pai
quizzesContainer.appendChild(postedQuizzes);
quizzesContainer.appendChild(draftQuizzes);

// Adiciona o quizzesContainer à seção principal
section.appendChild(quizzesContainer);

const box = Box({
  children: [header, btnCreateQuiz, section],
});

const main = document.querySelector(".main-content");
main.appendChild(box);
