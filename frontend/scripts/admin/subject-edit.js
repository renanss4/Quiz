import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Select } from "../../components/Select/Select.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { Optional } from "../../components/Optional/Optional.js";
import { Table } from "../../components/Table/Table.js";
import {
  editSubject,
  fetchSubjects,
  fetchUsers,
  deleteQuiz,
} from "../fetch.js";

// Extrai o subjectId da URL
const urlParams = new URLSearchParams(window.location.search);
const subjectId = urlParams.get("id");

if (!subjectId) {
  alert("ID da disciplina não fornecido");
  window.location.href = "./subject.html";
}

// Função para carregar os professores e atualizar o select
async function loadSelectTeacher() {
  const teachers = await fetchUsers({ role: "teacher" });
  const teacherOptions = [
    { value: "", label: "Selecione um professor", disabled: true },
    { value: null, label: "Não possui professor" },
    ...teachers.map((teacher) => ({
      value: teacher._id,
      label: teacher.name,
    })),
  ];

  // Limpa as opções existentes e adiciona as novas
  selectElement.innerHTML = "";
  teacherOptions.forEach((optionConfig) => {
    const option = document.createElement("option");
    option.value = optionConfig.value;
    option.textContent = optionConfig.label;
    option.disabled = optionConfig.disabled;
    selectElement.appendChild(option);
  });
}

// Função para carregar os dados da disciplina
async function loadSubjectData() {
  try {
    const subjects = await fetchSubjects({ _id: subjectId });
    const subject = subjects.find((subject) => subject._id === subjectId);
    if (!subject) {
      throw new Error("Disciplina não encontrada");
    }

    document.getElementById("subject-name").value = subject.name;
    const options = document.querySelectorAll("#subject-teacher option");
    options.forEach((option) => {
      if (subject.teacher_id._id === option.value) {
        option.selected = true;
      }
    });
  } catch (error) {
    console.error("Erro ao carregar dados da disciplina:", error);
  }
}

// Configuração inicial dos componentes da página
const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  items: [
    { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "#" },
    { iconSrc: "../../assets/books.svg", text: "Painel", link: "#" },
  ],
});
nav.appendChild(sidebar);

// Configurações do header, input, select e botão
const header = Header({
  title: "Editar Disciplina",
  btnBack: true,
  linkBack: "./subject.html",
});

const inputName = Input({
  label: "Nome",
  required: true,
  type: "text",
  placeholder: "Digite o nome da disciplina",
  name: "Nome",
  id: "subject-name",
});

const saveBtn = Button({
  text: "Salvar Alterações",
  onClick: () => {
    const name = document.getElementById("subject-name").value;
    const teacher_id = document.getElementById("subject-teacher").value;
    editSubject(subjectId, name, teacher_id)
      .then(() => {
        alert("Disciplina editada com sucesso!");
        window.location.href = "./subject.html";
      })
      .catch((error) => {
        alert("Erro ao editar disciplina: " + error.message);
      });
  },
});

const optionalTeacher = Optional({
  info: "Devem existir professores cadastrados, logo o campo é opcional.",
});

const selectTeacherContainer = Select({
  id: "subject-teacher",
  name: "teacher",
  options: [],
  placeholder: "Selecione um professor",
  label: "Professor",
});

const selectElement = selectTeacherContainer.querySelector("select");
selectTeacherContainer.appendChild(optionalTeacher);

const tableDiv = document.createElement("div");
tableDiv.classList.add("table-subject");

// Função para renderizar a tabela de quizzes
async function renderTable() {
  try {
    const response = await fetchSubjects({ id: subjectId });
    const subject = response[0];
    console.log(subject);

    if (Array.isArray(subject.quizzes)) {
      const rows = subject.quizzes.map((quiz) => [
        quiz.name,
        "",
        editButton(quiz._id),
        deleteButton(quiz._id),
      ]);

      const tableDiv = document.querySelector(".table-subject");

      const table = Table({
        headers: ["Nome", "", "Ações"],
        rows: rows,
      });

      tableDiv.innerHTML = "";

      const titleQuizzes = document.createElement("h2");
      titleQuizzes.textContent = "Quizzes";
      tableDiv.appendChild(titleQuizzes);
      tableDiv.appendChild(table);
    } else {
      console.error("Nenhum quiz encontrado para essa disciplina.");
    }
  } catch (error) {
    console.error("Erro ao renderizar a tabela:", error);
  }
}

// Função para criar o botão de exclusão do quiz
const deleteButton = (id) => {
  const btn = Button({
    type: "link",
    text: "Remover",
    onClick: async (event) => {
      event.preventDefault();

      const confirmDelete = confirm(
        "Tem certeza que deseja excluir este quiz?"
      );
      if (!confirmDelete) return;

      try {
        await deleteQuiz(id);
        alert("Quiz excluído com sucesso!");
        window.location.reload();
      } catch (error) {
        alert("Erro ao excluir quiz: " + error.message);
      }
    },
  });
  return btn;
};

const editButton = (id) =>
  Button({
    type: "link",
    text: "Editar",
    onClick: (event) => {
      event.preventDefault();
      window.location.href = `quiz-edit.html?id=${id}`;
    },
  });

// Adiciona os componentes à página
const container = Box({
  children: [header, inputName, selectTeacherContainer, tableDiv, saveBtn],
});
document.body.appendChild(container);

// Carrega e renderiza os dados
await loadSelectTeacher();
await loadSubjectData();
await renderTable();
