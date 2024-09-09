import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { Button } from "../../components/Button/Button.js";
import { fetchQuizzes, fetchStudentAnswers, deleteQuiz } from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("quiz_id");

if (!quizId) {
  alert("ID do quiz não fornecido");
  window.location.href = "./teacher-dashboard.html";
}

const quizzes = await fetchQuizzes();
const quiz = quizzes.find((quiz) => quiz._id === quizId);

const answers = (await fetchStudentAnswers({ quiz_id: quizId })) || [];

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
});
nav.appendChild(sidebar);

const header = Header({
  title: quiz.name,
  subtitle: quiz.subject_id.name,
  btnBack: true,
  linkBack: `subject.html?id=${quiz.subject_id._id}`,
});

// Função para formatar a data
function formatDate(date) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("pt-BR");
}

// Função para formatar o tempo de duração do quiz
function formatTime(time) {
  if (time < 60) {
    return `${time} min`;
  } else {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h${minutes}`;
  }
}

// Função para gerar uma section com as informações do quiz
const generateSectionAboutQuiz = () => {
  const section = document.createElement("section");
  section.classList.add("section");

  const h2 = document.createElement("h2");
  h2.classList.add("title");
  h2.textContent = "Orientações do Professor";

  const pOrientation = document.createElement("p");
  pOrientation.classList.add("text");
  pOrientation.textContent = quiz.orientation;

  const liInstructions = document.createElement("li");
  liInstructions.classList.add("attempt");
  liInstructions.textContent = `• Tentativas: ${quiz.attempts}`;

  const liTime = document.createElement("li");
  liTime.classList.add("time");
  liTime.textContent = `• Tempo máximo: ${formatTime(quiz.time)}`;

  const liDateEnd = document.createElement("li");
  liDateEnd.classList.add("date-end");
  liDateEnd.textContent = `• Data de Entrega: ${formatDate(quiz.date_end)}`;

  const list = document.createElement("ul");
  list.classList.add("list");
  list.appendChild(liInstructions);
  list.appendChild(liTime);
  list.appendChild(liDateEnd);

  section.appendChild(h2);
  section.appendChild(pOrientation);
  section.appendChild(list);

  return section;
};

const generateSectionAboutAnswers = () => {
  const section = document.createElement("section");
  section.classList.add("section-students");

  const h2 = document.createElement("h2");
  h2.classList.add("title");
  h2.textContent = "Alunos que responderam";

  section.appendChild(h2);

  if (!Array.isArray(answers) || answers.length === 0) {
    const noAnswersMessage = document.createElement("p");
    noAnswersMessage.textContent = "Nenhum aluno respondeu ainda";
    section.appendChild(noAnswersMessage);
  } else {
    for (const answer of answers) {
      const item = document.createElement("div");
      item.classList.add("item");

      // Nome do Aluno
      const studentName = document.createElement("p");
      studentName.textContent = answer.student_id.name;

      // Link para ver respostas
      const viewLink = document.createElement("a");
      viewLink.href = `student-answers.html?quiz_id=${quizId}&student_id=${answer.student_id._id}`;
      viewLink.textContent = "Ver Respostas";
      viewLink.style.color = "#1d4ed8"; // cor do link

      // Pontuação
      const score = document.createElement("p");
      score.textContent = `${answer.score}/10`;

      // Adiciona os elementos à div item
      item.appendChild(studentName);
      item.appendChild(viewLink);
      item.appendChild(score);

      section.appendChild(item);
    }
  }

  return section;
};

const btnDelete = Button({
  type: "destructive-outline",
  text: "Eliminar Quiz",
  onClick: async () => {
    const confirm = window.confirm(
      "Tem certeza que deseja eliminar este quiz?"
    );

    if (confirm) {
      await deleteQuiz(quizId);
      window.location.href = "./teacher-dashboard.html";
    }
  },
});

const box = Box({
  children: [
    header,
    generateSectionAboutQuiz(),
    generateSectionAboutAnswers(),
    btnDelete,
  ],
});
document.body.appendChild(box);
