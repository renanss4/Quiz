import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Timer } from "../../components/Timer/Timer.js";
import { Card } from "../../components/Card/Card.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { Input } from "../../components/Input/Input.js";
import { Button } from "../../components/Button/Button.js";
import {
  fetchQuizzes,
  sendStudentAnswer,
  fetchDataUser,
  fetchStudentSubjects,
  fetchStudentAnswers,
} from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("id");

if (!quizId) {
  alert("ID do quiz não fornecido");
  window.location.href = "./student-dashboard.html";
}

const quizzes = await fetchQuizzes();
const quiz = quizzes.find((quiz) => quiz._id === quizId);

// Pegando o usuário logado
const user = await fetchDataUser();
const relationship = await fetchStudentSubjects({
  enrollment: user.enrollment,
});
const studentId = relationship[0].student_id._id;

// função que verifica se o quiz já foi respondido pelo aluno
const studentAnswers = await fetchStudentAnswers({
  quiz_id: quizId,
  student_id: studentId,
});

if (studentAnswers.length >= quiz.attempts) {
  alert("Este quiz já foi respondido.");
  window.location.href = "./student-dashboard.html";
}

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

const timer = Timer({
  time: quiz.time,
  // time: 0.1,
  onTimeEnd: () => {
    alert("Tempo esgotado! O quiz será enviado automaticamente.");
    const answers = quiz.questions.map((question) => {
      const selectedOption = document.querySelector(
        `input[name=question_${question._id}]:checked`
      );
      return {
        question_id: question._id,
        answer_id: selectedOption?.value || 0,
      };
    });
    // Calculando a pontuação
    const score = calcScore(answers, quiz.questions);

    // console.log(quizId, studentId, score, answers);
    sendStudentAnswer(quizId, studentId, score, answers);
    alert("Respostas enviadas com sucesso!");
    window.location.href = "./student-dashboard.html";
  },
});

function calcScore(answers, questions) {
  let score = 0;
  answers.forEach((answer) => {
    const question = questions.find(
      (question) => question._id === answer.question_id
    );
    const correctOption = question.options.find((option) => option.correct);
    if (correctOption && correctOption._id === answer.answer_id) {
      score += 1;
    }
  });
  return score;
}

// Estado para armazenar as respostas selecionadas
let answersState = {};

// Função para atualizar o Card com base nas respostas
function updateCardWithAnswers() {
  const cardItems = quiz.questions.map((question, index) => {
    const selectedLetter = answersState[question._id] || "X";
    return {
      question: `Pergunta ${index + 1}`,
      answer: selectedLetter,
    };
  });

  // Atualizando o conteúdo do Card
  const updatedCard = Card({
    type: "default",
    title: "Perguntas",
    cardItems,
    onClick: () => {
      btnSend.click();
    },
    tittleBtn: "Enviar",
  });

  const existingCard = document.querySelector(".card");
  const box = document.querySelector(".box");
  if (existingCard) {
    box.replaceChild(updatedCard, existingCard);
  } else {
    box.appendChild(updatedCard);
  }
}

// Criar perguntas e opções para o aluno clicar
const questions = quiz.questions.map((question, index) => {
  const questionElement = document.createElement("section");
  questionElement.style.marginBottom = "20px"; // Espaço entre perguntas

  const questionId = document.createElement("h2");
  questionId.textContent = `Pergunta ${index + 1}`;
  questionElement.appendChild(questionId);

  const questionTitle = document.createElement("h3");
  questionTitle.textContent = question.name;
  questionElement.appendChild(questionTitle);

  const optionsContainer = document.createElement("div");
  optionsContainer.style.display = "flex";
  optionsContainer.style.flexDirection = "column";

  question.options.forEach((option, index) => {
    const letter = String.fromCharCode(97 + index); // a, b, c, d, e...

    const optionContainer = document.createElement("div");
    optionContainer.classList.add("option-container");

    const letterLabel = document.createElement("span");
    letterLabel.classList.add("option-letter");
    letterLabel.textContent = letter;

    const radioInput = Input({
      type: "radio",
      name: `question_${question._id}`,
      id: `question_${question._id}_option_${index}`,
      options: [{ label: option.option, value: option._id }],
      onChange: () => {
        // Atualizando o estado com a opção selecionada
        answersState[question._id] = letter.toUpperCase();
        updateCardWithAnswers();
      },
    });

    optionContainer.appendChild(letterLabel);
    optionContainer.appendChild(radioInput);
    optionsContainer.appendChild(optionContainer);
  });

  questionElement.appendChild(optionsContainer);
  return questionElement;
});

const btnSend = Button({
  text: "Enviar",
  onClick: () => {
    const answers = quiz.questions.map((question) => {
      const selectedOption = document.querySelector(
        `input[name=question_${question._id}]:checked`
      );
      return {
        question_id: question._id,
        answer_id: selectedOption?.value || 0,
      };
    });
    // Calculando a pontuação
    const score = calcScore(answers, quiz.questions);

    const confirmar = confirm("Entregar o quiz?");
    if (confirmar) {
      sendStudentAnswer(quizId, studentId, score, answers);
      alert("Respostas enviadas com sucesso!");
      window.location.href = "./student-dashboard.html";
    } else {
      alert("Respostas não enviadas");
      return;
    }
  },
});

// Inicialização do Card com perguntas e respostas vazias
const cardQuestions = Card({
  type: "default",
  title: "Perguntas",
  cardItems: quiz.questions.map((question, index) => ({
    question: `Pergunta ${index + 1}`,
    answer: "X",
  })),
  onClick: () => {
    btnSend.click();
  },
  tittleBtn: "Enviar",
});
cardQuestions.classList.add("card"); // Adicionando uma classe para facilitar a substituição

// Adicionando todos os elementos na Box e ao DOM
const box = Box({
  children: [header, timer, ...questions, cardQuestions],
});
box.classList.add("box"); // Adicionando uma classe para facilitar a substituição
document.body.appendChild(box);
