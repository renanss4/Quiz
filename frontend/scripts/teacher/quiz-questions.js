import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { Button } from "../../components/Button/Button.js";
import { Input } from "../../components/Input/Input.js";
import {
  fetchQuizzes,
  addQuestionToQuiz,
  transformDraftToQuiz,
} from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("quiz_id");

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
});
nav.appendChild(sidebar);

const quiz = await fetchQuizzes({ id: quizId });

const header = Header({
  title: "Nome do Quiz",
  subtitle: "Nome da Disciplina",
  btnBack: true,
  linkBack: `./subject.html?id=${quiz[0].subject_id._id}`,
});

// Função para gerar inputs de resposta
function generateAnswerInputs(questionId) {
  const inputAlternatives = Input({
    required: true,
    type: "textareaGroup",
    placeholder: "Digite uma resposta...",
    name: `answers-${questionId}`,
    id: `answers-${questionId}`,
  });

  return inputAlternatives;
}

// Função para criar uma pergunta
function createQuestionElement(questionNumber) {
  const questionId = `question-${questionNumber}`;
  const inputQuestion = Input({
    required: true,
    type: "textarea",
    label: `Pergunta ${questionNumber}`,
    placeholder: `Digite aqui a pergunta ${questionNumber}...`,
    name: questionId,
    id: questionId,
  });

  const alternatives = generateAnswerInputs(questionId);

  return { inputQuestion, alternatives };
}

// Cria as perguntas e alternativas
const questions = [];
const numQuestions = 10;

for (let i = 1; i <= numQuestions; i++) {
  const { inputQuestion, alternatives } = createQuestionElement(i);
  questions.push(inputQuestion, alternatives);
}

const btnDraft = Button({
  text: "Guardar Rascunho",
  type: "outline",
  size: "full",
  onClick: async () => {
    const questionsData = [];

    for (let i = 1; i <= numQuestions; i++) {
      const questionText = document.getElementById(`question-${i}`).value;
      const answerElements = document.querySelectorAll(
        `textarea[id^='answers-question-${i}_']`
      );
      const options = Array.from(answerElements).map((textarea, index) => ({
        option: textarea.value,
        correct: index === 0, // Marca a primeira opção como correta
      }));
      questionsData.push({ name: questionText, options });
    }

    const quiz = await fetchQuizzes({ id: quizId });
    const subjectId = quiz[0].subject_id._id;

    const response = await addQuestionToQuiz(quizId, questionsData);
    if (response) {
      alert("Rascunho salvo com sucesso!");
      window.location.href = `./subject.html?id=${subjectId}`;
    } else {
      alert("Erro ao salvar rascunho!");
    }
  },
});

const btnCreateQuiz = Button({
  type: "default",
  text: "Criar Quiz",
  imgSrc: "../../assets/create.svg",
  onClick: async () => {
    const questionsData = [];

    for (let i = 1; i <= numQuestions; i++) {
      const questionText = document.getElementById(`question-${i}`).value;
      const answerElements = document.querySelectorAll(
        `textarea[id^='answers-question-${i}_']`
      );
      const options = Array.from(answerElements).map((textarea, index) => ({
        option: textarea.value,
        correct: index === 0, // Marca a primeira opção como correta
      }));
      questionsData.push({ name: questionText, options });
    }

    const quiz = await fetchQuizzes({ id: quizId });
    const subjectId = quiz[0].subject_id._id;

    // const transformResult = await transformDraftToQuiz(quizId);
    // console.log("Draft transformado:", transformResult);
    await transformDraftToQuiz(quizId);

    const response = await addQuestionToQuiz(quizId, questionsData);
    // console.log("Resposta ao adicionar perguntas:", response);
    if (response) {
      alert("Quiz postado com sucesso!");
      window.location.href = `./subject.html?id=${subjectId}`;
    } else {
      alert("Erro ao postar o Quiz!");
    }
  },
});

btnCreateQuiz.classList.add("btn-create-quiz");

const divSpace = document.createElement("div");
divSpace.classList.add("space");
divSpace.style.padding = "1.5rem";

// Adiciona as perguntas e suas alternativas em uma única caixa
const box = Box({
  children: [header, ...questions, btnDraft, btnCreateQuiz, divSpace],
});

document.body.appendChild(box);
