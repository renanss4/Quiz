import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import {
  fetchQuizzes,
  addQuestionToQuiz,
  transformDraftToQuiz,
  changeAllQuestions,
} from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("id");

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

async function populateQuestions() {
  const quiz = await fetchQuizzes({ id: quizId });
  const questionData = quiz[0].questions;
  if (!questionData) return;

  questionData.forEach((question, index) => {
    // Preencher o texto da pergunta
    const questionTextarea = document.querySelector(`#question-${index + 1}`);
    if (questionTextarea) {
      questionTextarea.value = question.name;
    }

    // Preencher as alternativas
    question.options.forEach((answer, answerIndex) => {
      const answerTextarea = document.querySelector(
        `#answers-question-${index + 1}_${answerIndex}`
      );
      if (answerTextarea) {
        answerTextarea.value = answer.option;
        if (answer.correct) {
          answerTextarea.classList.add("correct-answer");
        } else {
          answerTextarea.classList.add("wrong-answer");
        }
      }
    });
  });
}

const btnSave = Button({
  text: "Salvar Perguntas",
  type: "outline",
  onClick: async () => {
    const questionsData = [];

    for (let i = 1; i <= 10; i++) {
      const questionText = document.getElementById(`question-${i}`).value;
      const answerElements = document.querySelectorAll(
        `textarea[id^='answers-question-${i}_']`
      );
      const options = Array.from(answerElements).map((textarea) => ({
        option: textarea.value,
        correct: textarea.classList.contains("correct-answer"),
      }));

      questionsData.push({
        name: questionText,
        options,
      });
    }

    // console.log(quizId, questionsData);
    await changeAllQuestions(quizId, questionsData);
    alert("Perguntas salvas com sucesso!");
    // window.location.href = `./quiz-view.html?quiz_id=${quizId}`;
  },
});

const btnPost = Button({
  text: "Publicar Quiz",
  type: "default",
  onClick: async () => {
    const quiz = await fetchQuizzes({ id: quizId });
    const questions = quiz[0].questions;
    if (questions.length < 10) {
      alert("O quiz deve conter 10 perguntas para ser publicado.");
      alert("Tenha certeza de que todas as perguntas estão salvas.");
      return;
    }

    const sure = confirm("Tem certeza que deseja publicar o quiz?");
    if (sure) {
      await transformDraftToQuiz(quizId);
      alert("Quiz publicado com sucesso!");
      window.location.href = `./quiz-view.html?quiz_id=${quizId}`;
    }
    //
  },
});

// Adiciona as perguntas e suas alternativas em uma única caixa
const box = Box({
  children: [header, ...questions, btnSave, btnPost],
});

document.body.appendChild(box);
await populateQuestions();
