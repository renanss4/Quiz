import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { Button } from "../../components/Button/Button.js";
import { Input } from "../../components/Input/Input.js";
import { Select } from "../../components/Select/Select.js";
import { Multiselect } from "../../components/MultiSelect/Multiselect.js";
import { fetchQuizzes, createQuiz } from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const subjectId = urlParams.get("subject_id");

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
});
nav.appendChild(sidebar);

const header = Header({
  title: "Informações do Quiz",
  subtitle: "",
  btnBack: true,
  linkBack: `./subject.html?id=${subjectId}`,
});

const inputName = Input({
  required: true,
  type: "text",
  placeholder: "Nome do Quiz",
  name: "name",
  id: "quiz-name",
});

const selectType = Select({
  options: [
    { value: "test", label: "Prova" },
    { value: "homework", label: "Exercício" },
  ],
  name: "type",
  id: "quiz-type",
  required: true,
});

const inputAttempts = Input({
  required: true,
  type: "number",
  placeholder: "Número de tentativas",
  name: "attempts",
  id: "quiz-attempts",
});

const selectTime = Select({
  options: [
    { value: 30, label: "30 minutos" },
    { value: 60, label: "1 hora" },
    { value: 90, label: "1 hora e 30 minutos" },
    { value: 120, label: "2 horas" },
    { value: 150, label: "2 horas e 30 minutos" },
    { value: 180, label: "3 horas" },
    { value: 210, label: "3 horas e 30 minutos" },
    { value: 240, label: "4 horas" },
  ],
  name: "time",
  id: "quiz-time",
  required: true,
});

const dateStart = Input({
  required: true,
  type: "date",
  placeholder: "Data de início",
  name: "dateStart",
  id: "quiz-date-start",
});

const dateEnd = Input({
  required: true,
  type: "date",
  placeholder: "Data de entrega",
  name: "dateEnd",
  id: "quiz-date-end",
});

const orientationTextarea = Input({
  required: true,
  type: "textarea",
  placeholder: "Orientações",
  name: "orientation",
  id: "quiz-orientation",
});

const btnDraft = Button({
  text: "Guardar Rascunho",
  type: "outline",
  size: "full",
  onClick: async () => {
    // Pegando os valores dos inputs
    const name = document.getElementById("quiz-name").value;
    const type = document.getElementById("quiz-type").value;
    const attempts = Number(document.getElementById("quiz-attempts").value);
    const time = Number(document.getElementById("quiz-time").value);
    const dateStart = document.getElementById("quiz-date-start").value;
    const dateEnd = document.getElementById("quiz-date-end").value;
    const orientation = document.getElementById("quiz-orientation").value;

    // Chamando a função para criar o quiz
    try {
      await createQuiz(
        name,
        type,
        time,
        attempts,
        dateStart,
        dateEnd,
        orientation,
        subjectId,
        true
      );
      alert("Quiz salvo como rascunho com sucesso!");
      window.location.href = `./subject.html?id=${subjectId}`;
    } catch (error) {
      alert("Erro ao salvar o quiz como rascunho: " + error.message);
    }
  },
});

const btnQuestions = Button({
  text: "Criar Perguntas",
  type: "default",
  size: "full",
  onClick: async () => {
    // Pegando os valores dos inputs
    const name = document.getElementById("quiz-name").value;
    const type = document.getElementById("quiz-type").value;
    const attempts = Number(document.getElementById("quiz-attempts").value);
    const time = Number(document.getElementById("quiz-time").value);
    const dateStart = document.getElementById("quiz-date-start").value;
    const dateEnd = document.getElementById("quiz-date-end").value;
    const orientation = document.getElementById("quiz-orientation").value;

    // Chamando a função para criar o quiz
    try {
      await createQuiz(
        name,
        type,
        time,
        attempts,
        dateStart,
        dateEnd,
        orientation,
        subjectId,
        true
      );

      // busca o id do quiz recém-criado
      const quizzes = await fetchQuizzes({ name: name });
      const quiz = quizzes[0];

      if (quiz) {
        const quizId = quiz._id;
        window.location.href = `./quiz-questions.html?quiz_id=${quizId}`;
      }
    } catch (error) {
      alert("Erro ao criar o quiz: " + error.message);
    }
  },
});

const divSpace = document.createElement("div");
divSpace.classList.add("space");
divSpace.style.padding = "1.5rem";

const continer = Box({
  children: [
    header,
    inputName,
    selectType,
    inputAttempts,
    selectTime,
    dateStart,
    dateEnd,
    orientationTextarea,
    btnDraft,
    btnQuestions,
    divSpace,
  ],
});

document.body.appendChild(continer);
