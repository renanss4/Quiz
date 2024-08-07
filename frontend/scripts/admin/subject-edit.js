import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Select } from "../../components/Select/Select.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { Optional } from "../../components/Optional/Optional.js";
import { editSubject, fetchSubjects, fetchUsers } from "../fetch.js";

// Extrai o subjectId da URL
const urlParams = new URLSearchParams(window.location.search);
const subjectId = urlParams.get('id');

if (!subjectId) {
  alert("ID da disciplina não fornecido");
  window.location.href = "./subject.html";
}

document.addEventListener('DOMContentLoaded', async () => {
  // Cria e configura o elemento de navegação
  const nav = document.querySelector(".nav");
  const sidebar = Sidebar({
    items: [
      { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "#" },
      { iconSrc: "../../assets/books.svg", text: "Painel", link: "#" },
    ],
  });
  nav.appendChild(sidebar);

  // Cria e configura o cabeçalho
  const header = Header({
    title: "Editar Disciplina",
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

  // Cria e configura o botão de salvar alterações
  const saveBtn = Button({
    text: "Salvar Alterações",
    onClick: () => {
      const name = document.getElementById("subject-name").value;
      let teacher_id = document.getElementById("subject-teacher").value;
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

  // Função assíncrona para carregar os dados da disciplina
  async function loadSubjectData() {
    let subject;
    try {
      const subjects = await fetchSubjects({ _id: subjectId });
      subjects.forEach((subjectOptions) => {
        if (subjectOptions._id === subjectId) {
          subject = subjectOptions;
        }
      })
      if (!subject) {
        throw new Error("Disciplina não encontrada");
      }
      document.getElementById("subject-name").value = subject.name;
      const options = document.querySelectorAll("#subject-teacher option");
      options.forEach((option) => {
        if (subject.teacher_id._id === option.value){
          option.selected = true;
        } 
      })
    } catch (error) {

      // alert("Erro ao carregar dados da disciplina: " + error.message);
      // window.location.href = "./subject.html";
    }
  }

  // Carrega e adiciona as opções ao select
  await loadSelectTeacher();

  // Adiciona o Box ao corpo do documento após carregar os dados
  const container = Box({
    children: [header, inputName, selectTeacherContainer, saveBtn],
  });

  document.body.appendChild(container);

  // Carrega os dados da disciplina após renderizar o Box
  await loadSubjectData();
});
