import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { fetchQuizzes, addQuestionToQuiz } from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const questionId = urlParams.get("id");

const quiz = await fetchQuizzes({ id: questionId });
const questionData = quiz[0].questions;

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
});
nav.appendChild(sidebar);

const header = Header({
  title: "Nome do Quiz",
  subtitle: "Nome da Disciplina",
  btnBack: true,
  linkBack: "./quiz-create.html",
});

// Função para gerar inputs de resposta preenchidos
function generateAnswerInputs(questionId, answers = []) {
  const inputAlternatives = Input({
    required: true,
    type: "textareaGroup",
    placeholder: "Digite uma resposta...",
    name: `answers-${questionId}`,
    id: `answers-${questionId}`,
  });

  // Preenche os textareas com as respostas
  const textareas = inputAlternatives.querySelectorAll("textarea");
  textareas.forEach((textarea, index) => {
    textarea.textContent = answers[index].option || "";
  });

  return inputAlternatives;
}

// Função para criar uma pergunta preenchida
function createQuestionElement(
  questionNumber,
  questionText = "",
  answers = []
) {
  const questionId = `question-${questionNumber}`;
  const inputQuestion = Input({
    required: true,
    type: "textarea",
    label: `Pergunta ${questionNumber}`,
    placeholder: `Digite aqui a pergunta ${questionNumber}...`,
    name: questionId,
    id: questionId,
  });

  // Preenche o campo de texto da pergunta
  inputQuestion.querySelector("textarea").textContent = questionText;

  const alternatives = generateAnswerInputs(questionId, answers);

  return { inputQuestion, alternatives };
}

// Cria as perguntas e alternativas preenchidas
const questions = [];

questionData.forEach((question, index) => {
  const { inputQuestion, alternatives } = createQuestionElement(
    index + 1,
    question.name,
    question.options
  );
  questions.push(inputQuestion, alternatives);
});

const btnSave = Button({
  text: "Salvar",
  onClick: async () => {
    const questionsData = [];

    for (let i = 1; i <= questionData.length; i++) {
      const questionText = document.getElementById(`question-${i}`).value;
      const answerElements = document.querySelectorAll(
        `textarea[id^='answers-question-${i}_']`
      );
      const options = Array.from(answerElements).map((textarea) => ({
        option: textarea.value,
      }));

      questionsData.push({
        name: questionText,
        options,
      });
    }

    // console.log(questionId, questionsData);
    await addQuestionToQuiz(questionId, questionsData);
  },
});

const divSpace = document.createElement("div");
divSpace.classList.add("space");
divSpace.style.padding = "1.5rem";

// Adiciona as perguntas e suas alternativas em uma única caixa
const box = Box({
  children: [header, ...questions, btnSave, divSpace],
});

document.body.appendChild(box);
