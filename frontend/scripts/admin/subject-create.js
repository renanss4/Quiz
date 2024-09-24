import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Select } from "../../components/Select/Select.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { Optional } from "../../components/Optional/Optional.js";
import { createSubject, fetchUsers } from "../fetch.js";

// Cria e configura o elemento de navegação
const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  items: [
    // { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "#" },
    // { iconSrc: "../../assets/books.svg", text: "Painel", link: "#" },
  ],
});
nav.appendChild(sidebar);

// Cria e configura o cabeçalho
const header = Header({
  title: "Criar Disciplina",
  subtitle: "",
  btnBack: true,
  linkBack: "./subject.html",
});

// Cria e configura o campo de input para o nome
const inputName = Input({
  label: "Nome",
  required: true,
  type: "text",
  placeholder: "Digite o nome da disciplina",
  name: "Nome",
  id: "subject-name",
});

// Cria e configura o botão de criar disciplina
const createBtn = Button({
  text: "Cadastrar Disciplina",
  onClick: () => {
    const name = document.getElementById("subject-name").value;
    let teacher_id = document.getElementById("subject-teacher").value;
    createSubject(name, teacher_id)
      .then(() => {
        alert("Disciplina cadastrada com sucesso!");
        window.location.href = "./subject.html";
      })
      .catch((error) => {
        alert("Erro ao cadastrar disciplina: " + error.message);
      });
  },
});

// Cria e configura o componente opcional
const optionalTeacher = Optional({
  info: "Devem existir professores cadastrados, logo o campo é opcional.",
});

// Cria e configura o select de professores
const selectTeacherContainer = Select({
  id: "subject-teacher",
  name: "teacher",
  options: [],
  placeholder: "Selecione um professor",
  label: "Professor",
});

// Adiciona o select ao container
const selectElement = selectTeacherContainer.querySelector("select");
selectTeacherContainer.appendChild(optionalTeacher);

// Função assíncrona para carregar os professores e atualizar o select
async function loadSelectTeacher() {
  const teachers = await fetchUsers({ role: "teacher" });
  const teacherOptions = [
    { value: "", label: "Selecione um professor", disabled: true },
    { value: null, label: "Não possui professor" },
    ...teachers.map((teacher) => ({ value: teacher._id, label: teacher.name })),
  ];

  // Limpa as opções existentes
  selectElement.innerHTML = "";

  // Adiciona a opção de placeholder
  // if (selectTeacherContainer.querySelector("select").placeholder) {
  //   const placeholderOption = document.createElement("option");
  //   placeholderOption.value = "";
  //   placeholderOption.textContent = selectTeacherContainer.querySelector(
  //     "select"
  //   ).placeholder;
  //   placeholderOption.disabled = true;
  //   placeholderOption.selected = true;
  //   selectElement.appendChild(placeholderOption);
  // }

  // Adiciona as novas opções
  teacherOptions.forEach((optionConfig) => {
    const option = document.createElement("option");
    option.value = optionConfig.value;
    option.textContent = optionConfig.label;
    option.disabled = optionConfig.disabled;
    selectElement.appendChild(option);
  });
}

const divSpace = document.createElement("div");
divSpace.classList.add("space");
divSpace.style.padding = "1.5rem";

// Carrega e adiciona as opções ao select
loadSelectTeacher().then(() => {
  // Adiciona o Box ao corpo do documento após carregar os dados
  const container = Box({
    children: [header, inputName, selectTeacherContainer, createBtn, divSpace],
  });

  document.body.appendChild(container);
});
