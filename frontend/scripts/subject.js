import {
  createSubject,
  fetchAllTeachers,
  fetchAllSubjects,
  fetchProfessor,
} from "./configs/fetch.js";

// 1- Pegar elementos do DOM
const buttonCreate = document.querySelector("#cadastrar");
const content = document.querySelector("#content");
const formContainer = document.querySelector("#form-container");
const buttonSubmit = document.querySelector("#submit");

// 2- Adicionar evento de click no botão de cadastrar
buttonCreate.addEventListener("click", showForm);

// 3- Função para mostrar um form para cadastrar a matéria
async function showForm() {
  content.style.display = "none";
  formContainer.style.display = "block";

  try {
    const teachers = await fetchAllTeachers();
    populateTeachersDropdown(teachers);
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
  }
}

// 4- Função para popular o dropdown com professores
function populateTeachersDropdown(teachers) {
  const fieldTeacher = document.querySelector("#teacher");
  fieldTeacher.innerHTML = '<option value="">Selecione um professor</option>'; // Clear existing options

  teachers.forEach((teacher) => {
    // console.log(teacher._id, teacher.name);
    const option = document.createElement("option");
    option.value = teacher._id; // Assumindo que o id do professor está no campo id
    option.textContent = teacher.name; // Assumindo que o nome do professor está no campo name
    fieldTeacher.appendChild(option);
  });
}

// 5- Função para enviar os dados do form
buttonSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  const fieldSubject = document.querySelector("#name");
  const fieldTeacher = document.querySelector("#teacher");

  //   console.log(fieldTeacher.options[fieldTeacher.selectedIndex].text);
  const selectedTeacher = fieldTeacher.options[fieldTeacher.selectedIndex];

  // console.log(selectedTeacher.value, selectedTeacher.textContent);

  createSubject(fieldSubject.value, selectedTeacher.value);
  hideForm();
});

// 6- Função para esconder o form e mostrar o conteúdo
function hideForm() {
  content.style.display = "block";
  formContainer.style.display = "none";
}

// 7- Função para mostrar as disciplinas cadastradas na tela
async function loadSubjects() {
  try {
    const subjects = await fetchAllSubjects();
    displaySubjects(subjects);
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
  }
}

// Função para exibir disciplinas na tabela
function displaySubjects(subjects) {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = ""; // Limpa as disciplinas existentes

  subjects.forEach(async (subject) => {
    // pegar o nome do professor que tem o id igual ao id do professor da disciplina
    const teacher = await fetchProfessor(subject.teacher_id);
    subject.teacher = teacher.name;

    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = subject.name;
    tr.appendChild(tdName);

    const tdTeacher = document.createElement("td");
    tdTeacher.textContent = subject.teacher;
    tr.appendChild(tdTeacher);

    const tdQuiz = document.createElement("td");
    tdQuiz.textContent = subject.quizCount; // Assumindo que existe um campo quizCount
    tr.appendChild(tdQuiz);

    const tdActions = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.href = "#";
    editLink.textContent = "Editar";
    editLink.style.marginRight = "5px";
    tdActions.appendChild(editLink);

    const deleteLink = document.createElement("a");
    deleteLink.href = "#";
    deleteLink.textContent = "Excluir";
    deleteLink.style.marginLeft = "5px";
    tdActions.appendChild(deleteLink);

    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}

// Carregar disciplinas ao carregar a página
document.addEventListener("DOMContentLoaded", loadSubjects);

// Voltar para a tela de disciplinas
const backButton = document.querySelector("#back");
backButton.addEventListener("click", hideForm);

// Encerrar sessão
const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
