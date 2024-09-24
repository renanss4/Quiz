import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { Card } from "../../components/Card/Card.js";
import { fetchQuizzes, fetchStudentAnswers } from "../fetch.js";

// Obtendo o ID da resposta do aluno na URL
const urlParams = new URLSearchParams(window.location.search);
const answerId = urlParams.get("id");

// Buscando as respostas do aluno
const answers = await fetchStudentAnswers({ id: answerId });
const quizId = answers[0].quiz_id._id;
// Buscando os dados do quiz correspondente
const quizzes = await fetchQuizzes({ id: quizId });
const quiz = quizzes[0];

// Montando a barra lateral
const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
});
nav.appendChild(sidebar);

// Montando o cabeçalho
const header = Header({
  title: quiz.name,
  subtitle: quiz.subject_id.name,
  btnBack: true,
  linkBack: `quiz-view.html?id=${quizId}`,
});

// Associar letras A, B, C, D às opções
const optionLetters = ["A", "B", "C", "D"];

// Preparar os itens do card
const cardItems = answers[0].answers.map((answer, index) => {
  const question = quiz.questions.find((q) => q._id === answer.question_id);
  const correctOption = question.options.find((option) => option.correct);

  // Descobrir a opção que o aluno escolheu (para exibir corretamente)
  const studentOption = question.options.find(
    (option) => option._id === answer.answer_id
  );

  const isCorrect = answer.answer_id === correctOption._id;

  return {
    question: `Pergunta ${index + 1}`,
    answer: `${optionLetters[question.options.indexOf(studentOption)]}`, // Exibindo a opção que o aluno escolheu
    isCorrect: isCorrect, // Passando se a resposta está correta ou não
  };
});

const card = Card({
  title: `Nota ${answers[0].score}`,
  cardItems,
});

const questionsWithAnswers = quiz.questions.map((question, index) => {
  const questionElement = document.createElement("section");
  questionElement.style.marginBottom = "20px";

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

    const letterLabel = document.createElement("p");
    letterLabel.classList.add("option-letter");
    letterLabel.textContent = letter;

    const optionText = document.createElement("p");
    optionText.textContent = option.option;

    // Verifica se a opção é a correta
    const isCorrect = option.correct;

    // Verifica se a opção foi selecionada pelo aluno
    const studentAnswer = answers[0].answers.find(
      (answer) => answer.question_id === question._id
    );
    const isSelected = studentAnswer && studentAnswer.answer_id === option._id;

    if (isCorrect) {
      if (isSelected) {
        optionContainer.classList.add("correct"); // Aplica a classe de cor verde
      } else {
        optionContainer.classList.add("default"); // Aplica a classe padrão (opcional)
      }
    } else if (isSelected) {
      optionContainer.classList.add("incorrect"); // Aplica a classe de cor vermelha
    } else {
      optionContainer.classList.add("default"); // Aplica a classe padrão (opcional)
    }

    optionContainer.appendChild(letterLabel);
    optionContainer.appendChild(optionText);
    optionsContainer.appendChild(optionContainer);
  });

  questionElement.appendChild(optionsContainer);
  return questionElement;
});

const divSpace = document.createElement("div");
divSpace.classList.add("space");
divSpace.style.padding = "1.5rem";

const box = Box({
  children: [header, ...questionsWithAnswers, card, divSpace],
});
document.body.appendChild(box);
