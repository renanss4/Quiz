import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { Button } from "../../components/Button/Button.js";
import { Card } from "../../components/Card/Card.js";
import {
  fetchQuizzes,
  fetchStudentAnswers,
  fetchDataUser,
  fetchUsers,
} from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("id");

const quizzes = await fetchQuizzes();
const quiz = quizzes.find((quiz) => quiz._id === quizId);
const subject = quiz.subject_id;

if (!quizId) {
  alert("ID do quiz não fornecido");
  window.location.href = `subject.html?id=${subject._id}`;
}

const user = await fetchDataUser();
const students = await fetchUsers({ enrollment: user.enrollment });
const studentId = students[0]._id;

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
});
nav.appendChild(sidebar);

const header = Header({
  title: quiz.name,
  subtitle: subject.name,
  btnBack: true,
  linkBack: `subject.html?id=${subject._id}`,
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
const generateSection = () => {
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

  const btnStart = Button({
    text: "Começar",
    onClick: () => {
      window.location.href = `quiz-solve.html?id=${quiz._id}`;
    },
  });

  section.appendChild(btnStart);
  return section;
};

async function renderAttempts() {
  // Simulando a obtenção das respostas do aluno e o número de tentativas do quiz
  const allAttempts = await fetchStudentAnswers(quizId);

  // Filtrar as tentativas para o studentId atual
  const studentAttempts = allAttempts.filter(
    (attempt) => attempt.student_id._id === studentId
  );

  const numberOfAttempts = quiz.attempts;

  // Array para armazenar os itens do card
  const cardItems = [];

  // Inicializando o array com "Não realizada"
  for (let i = 0; i < numberOfAttempts; i++) {
    cardItems.push({
      question: `${i + 1}ª Tentativa`,
      answer: "Não realizada",
    });
  }

  // Atualizar as tentativas realizadas com base nas respostas do aluno
  studentAttempts.forEach((attempt, index) => {
    cardItems[index] = {
      question: `${index + 1}ª Tentativa`,
      answer: `${attempt.score}/10`,
      link: attempt.score ? `student-answers.html?id=${attempt._id}` : null,
    };
  });

  // Criar o card com os itens atualizados
  const card = Card({
    type: "default",
    title: "Tentativas",
    cardItems,
  });

  const divSpace = document.createElement("div");
  divSpace.classList.add("space");
  divSpace.style.padding = "1.5rem";

  // Criar o container para o card
  const box = Box({
    children: [header, generateSection(), card, divSpace],
  });

  // Adicionar o container ao DOM
  document.body.appendChild(box);
}

// Chamar a função para renderizar as tentativas
renderAttempts();
