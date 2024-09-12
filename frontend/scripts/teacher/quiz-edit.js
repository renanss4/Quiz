import { Sidebar } from "../../components/SideBar/SideBar.js";
import { Header } from "../../components/Header/Header.js";
import { Box } from "../../components/Box/Box.js";
import { Button } from "../../components/Button/Button.js";
import { Input } from "../../components/Input/Input.js";
import { Select } from "../../components/Select/Select.js";
import { fetchSubjects, fetchQuizzes, editQuiz } from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("quiz_id");

const quizzes = await fetchQuizzes({ id: quizId });
const quiz = quizzes.find((quiz) => quiz._id === quizId);
console.log(quiz);

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [],
});
nav.appendChild(sidebar);

const header = Header({
  title: "Informações do Quiz",
  subtitle: "",
  btnBack: true,
  linkBack: `./quiz-view.html?quiz_id=${quiz._id}`,
});

const inputName = Input({
  required: true,
  type: "text",
  placeholder: "Nome do Quiz",
  name: "name",
  id: "quiz-name",
});

const populateSelectWithSubjects = async () => {
  // tem que retornar as disciplinas para eu utilizar no value e no label
  const subjects = await fetchSubjects();
  const options = subjects.map((subject) => ({
    value: subject._id,
    label: subject.name,
  }));

  return options;
};

const selectSubject = Select({
  options: await populateSelectWithSubjects(),
  name: "subject",
  id: "quiz-subject",
  required: true,
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

const selectTime = Select({
  options: [
    { value: 30, label: "30 minutos" },
    { value: 60, label: "1 hora" },
    { value: 90, label: "1 hora e 30 minutos" },
    { value: 120, label: "2 horas" },
    { value: 150, label: "2 horas e 30 minutos" },
    { value: 180, label: "3 horas" },
    { value: 210, label: "3 horas e 30 minutos" },
  ],
  name: "time",
  id: "quiz-time",
  required: true,
});

const inputAttempts = Input({
  required: true,
  type: "number",
  placeholder: "Número de tentativas",
  name: "attempts",
  id: "quiz-attempts",
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

function loadQuizData() {
  try {
    document.getElementById("quiz-name").value = quiz.name;
    document.getElementById("quiz-subject").value = quiz.subject_id._id;
    document.getElementById("quiz-type").value = quiz.type;
    document.getElementById("quiz-time").value = quiz.time;
    document.getElementById("quiz-attempts").value = quiz.attempts;

    // Formatar as datas para o formato YYYY-MM-DD
    document.getElementById("quiz-date-start").value = new Date(quiz.date_start)
      .toISOString()
      .split("T")[0];
    document.getElementById("quiz-date-end").value = new Date(quiz.date_end)
      .toISOString()
      .split("T")[0];

    document.getElementById("quiz-orientation").value = quiz.orientation;
  } catch (error) {
    console.error("Erro ao buscar quiz: " + error.message);
  }
}

const btnSave = Button({
  text: "Salvar",
  type: "outline",
  onClick: async () => {
    const name = document.getElementById("quiz-name").value;
    const subject = document.getElementById("quiz-subject").value;
    const type = document.getElementById("quiz-type").value;
    const time = document.getElementById("quiz-time").value;
    const attempts = document.getElementById("quiz-attempts").value;
    const dateStart = document.getElementById("quiz-date-start").value;
    const dateEnd = document.getElementById("quiz-date-end").value;
    const orientation = document.getElementById("quiz-orientation").value;

    const data = {
      name,
      subject_id: subject,
      type,
      time,
      attempts,
      date_start: dateStart,
      date_end: dateEnd,
      orientation,
    };

    // console.log(data);
    const response = await editQuiz(quizId, data);
    if (response.error) {
      alert(response.message);
    } else {
      alert("Quiz editado com sucesso!");
      window.location.href = `./quiz-view.html?quiz_id=${quiz._id}`;
    }
  },
});

const btnQuestions = Button({
  text: "Questões",
  type: "default",
  onClick: () => {
    window.location.href = `./question-edit.html?id=${quizId}`;
  },
});

const box = Box({
  children: [
    header,
    inputName,
    selectSubject,
    selectType,
    selectTime,
    inputAttempts,
    dateStart,
    dateEnd,
    orientationTextarea,
    btnSave,
    btnQuestions,
  ],
});
document.body.appendChild(box);

loadQuizData();
