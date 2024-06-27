import {
  createSubject,
  fetchAllTeachers,
  fetchAllSubjects,
  fetchProfessor,
  deleteSubject,
} from "./configs/fetch.js";

// 1- Pegar elementos do DOM
const buttonCreate = document.querySelector("#cadastrar");
const content = document.querySelector("#content");
const formContainer = document.querySelector("#form-container");
const buttonSubmit = document.querySelector("#submit");
const countSubject = document.querySelector("#count-subject");
const divError = document.querySelector("#error");
const fieldSubject = document.querySelector("#name");
const fieldTeacher = document.querySelector("#teacher");
const dialog = document.querySelector("#dialog");
const cancelButton = document.querySelector("#cancel");
const confirmButton = document.querySelector("#confirm");
const pNameSubject = document.querySelector("#data-dialog");

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

  // Adiciona a opção "Não possui professor"
  const optionWithoutTeacher = document.createElement("option");
  optionWithoutTeacher.value = "none";
  optionWithoutTeacher.textContent = "Não possui professor";
  fieldTeacher.appendChild(optionWithoutTeacher);

  teachers.forEach((teacher) => {
    const option = document.createElement("option");
    option.value = teacher._id;
    option.textContent = teacher.name;
    fieldTeacher.appendChild(option);
  });
}

// função para verificar se já existe a disciplina
async function checkSubject(subject) {
  const subjects = await fetchAllSubjects();
  return subjects.find((s) => s.name === subject);
}

// function clearFields() {
//   fieldSubject.value = "";
//   fieldTeacher.value = "";
//   divError.style.display = "none";
//   fieldSubject.style.border = "1px solid #ccc";
//   fieldTeacher.style.border = "1px solid #ccc";
// }

// fieldSubject.addEventListener("focus", clearFields);
// fieldTeacher.addEventListener("focus", clearFields);

// 5- Função para enviar os dados do form
buttonSubmit.addEventListener("click", async (event) => {
  event.preventDefault();

  // check if the subject is empty
  if (!fieldSubject.value) {
    fieldSubject.style.border = "1px solid red";
    fieldTeacher.style.border = "1px solid red";
    divError.style.display = "block";
    divError.textContent = "Preencha todos os campos.";
    return;
  }

  // check if the teacher is selected
  if (!fieldTeacher.value) {
    fieldSubject.style.border = "1px solid red";
    fieldTeacher.style.border = "1px solid red";
    divError.style.display = "block";
    divError.textContent = "Selecione um professor.";
    return;
  }

  // checks if the subject already exists
  const subjectExists = await checkSubject(fieldSubject.value);
  if (subjectExists) {
    divError.style.display = "block";
    divError.textContent = "Disciplina já cadastrada.";
    return;
  }

  const selectedTeacher =
    fieldTeacher.options[fieldTeacher.selectedIndex].value;
  const teacherId = selectedTeacher === "none" ? null : selectedTeacher;

  createSubject(fieldSubject.value, teacherId);
  hideForm();
  loadSubjects();
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
    countSubject.textContent = `${subjects.length} Disciplinas Cadastradas`;
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
    if (subject.teacher_id) {
      const teacher = await fetchProfessor(subject.teacher_id);
      subject.teacher = teacher.name;
    } else {
      subject.teacher = "Não possui professor";
    }

    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = subject.name;
    tr.appendChild(tdName);

    const tdTeacher = document.createElement("td");
    tdTeacher.textContent = subject.teacher;
    tr.appendChild(tdTeacher);

    const tdQuiz = document.createElement("td");
    tdQuiz.textContent = subject.quizCount || 0;
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
    deleteLink.addEventListener("click", () => {
      pNameSubject.textContent = `Você irá elimiar a disciplina "${subject.name}". Esta ação não pode ser desfeita.`;
      dialog.style.display = "flex";

      cancelButton.addEventListener("click", () => {
        dialog.style.display = "none";
      });

      confirmButton.addEventListener("click", () => {
        deleteSubject(subject._id);
        dialog.style.display = "none";
      });
    });
    tdActions.appendChild(deleteLink);

    tr.appendChild(tdActions);

    tbody.appendChild(tr);
  });
}

// Carregar disciplinas ao carregar a página
document.addEventListener("DOMContentLoaded", loadSubjects);

// Voltar para a tela de disciplinas ou para a tela do painel do admin
const backButton = document.querySelector("#back");
backButton.addEventListener("click", hideForm);

// voltar para dashboard do admin
const painelButton = document.querySelector("#painel");
painelButton.addEventListener("click", () => {
  window.location.href = "admin-dashboard.html";
});

// Encerrar sessão
const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
