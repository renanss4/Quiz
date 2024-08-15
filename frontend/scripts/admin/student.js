// Importação dos componentes e funções necessárias
import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Box } from "../../components/Box/Box.js";
import { Header } from "../../components/Header/Header.js";
import { Button } from "../../components/Button/Button.js";
import { Table } from "../../components/Table/Table.js";
import { fetchStudents, deleteUser, fetchStudentSubjects } from "../fetch.js";

// Inicialização da sidebar e adição ao DOsM
const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  itens: [
    {
      iconSrc: "../../assets/house.svg",
      text: "Dashboard",
      link: "admin-dashboard.html",
    },
  ],
});
nav.appendChild(sidebar);

// função que conta quantos alunos estão cadastrados
async function countStudents() {
  try {
    const students = await fetchStudents();
    if (students.length > 0) {
      const subtitle = document.querySelector("h2");
      subtitle.innerHTML = `${students.length} Alunos Cadastrados`;
    }
  } catch (error) {
    alert("Erro ao buscar alunos: " + error.message);
  }
}
countStudents();

// Criação do header
const headerElement = Header({
  title: "Alunos",
  subtitle: "Nenhum aluno cadastrado",
  btnBack: true,
  linkBack: "admin-dashboard.html",
});

const buttonDiv = document.createElement("div");
buttonDiv.className = "button-create";
const buttonCreate = Button({
  type: "default",
  size: "normal",
  imgSrc: "../../assets/create.svg",
  text: "Cadastrar",
  onClick: () => (window.location.href = "student-create.html"),
});
buttonDiv.appendChild(buttonCreate);

// criação dos botões de editar e excluir
function editButton(id) {
  const button = Button({
    type: "link",
    text: "Editar",
    link: `student-edit.html?id=${id}`,
  });
  return button;
}

function deleteButton(id) {
  const button = Button({
    type: "link",
    text: "Excluir",
    onClick: async (event) => {
      event.preventDefault();

      const confirmDelete = confirm(
        "Tem certeza que deseja excluir este aluno?"
      );
      if (!confirmDelete) {
        return;
      }

      try {
        await deleteUser(id);
        alert("Aluno excluído com sucesso!");
        window.location.reload();
      } catch (error) {
        alert("Erro ao excluir aluno: " + error.message);
      }
    },
  });
  return button;
}

// Contar quantas disciplinas o aluno está matriculado
async function countStudentSubjects(studentId) {
  try {
    const response = await fetchStudentSubjects({ student_id: studentId });
    return response.length;
  } catch (error) {
    console.error("Failed to count student subjects:", error);
    return 0;
  }
}

// mostra as disciplinas que o aluno está matriculado
async function showStudentSubjects(studentId) {
  try {
    const response = await fetchStudentSubjects({ student_id: studentId });
    let subjects = [];
    for (const subject of response) {
      subjects.push(subject.subject_id.name);
    }
    return subjects;
  } catch (error) {
    console.error("Failed to show student subjects:", error);
    return [];
  }
}

// Criação da tabela
const tableDiv = document.createElement("div");
tableDiv.className = "table-student";

// Função para renderizar a tabela
async function renderTable() {
  try {
    const response = await fetchStudents();
    if (Array.isArray(response)) {
      const students = response;

      const rows = await Promise.all(
        students.map(async (student) => {
          const subjectCount = await countStudentSubjects(student._id);
          const subjects = await showStudentSubjects(student._id);
          console.log(subjects);

          return [
            student.enrollment,
            student.name,
            subjectCount,
            editButton(student._id),
            deleteButton(student._id),
          ];
        })
      );

      const tableDiv = document.querySelector(".table-student");
      const table = Table({
        headers: ["Matrícula", "Nome", "Disciplinas", "Ações"],
        rows: rows,
      });

      tableDiv.innerHTML = "";
      tableDiv.appendChild(table);
    }
  } catch (error) {
    console.error("Failed to render table:", error);
  }
}
renderTable();

// Criação do box
const box = Box({
  children: [headerElement, buttonDiv, tableDiv],
});

const mainContent = document.querySelector(".main-content");
mainContent.appendChild(box);
