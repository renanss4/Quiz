import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Box } from "../../components/Box/Box.js";
import { Header } from "../../components/Header/Header.js";
import { Button } from "../../components/Button/Button.js";
import { Table } from "../../components/Table/Table.js";
import { fetchTeachers, deleteUser, fetchSubjects } from "../fetch.js";

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  items: [
    {
      iconSrc: "../../assets/house.svg",
      text: "Dashboard",
      link: "admin-dashboard.html",
    },
  ],
});
nav.appendChild(sidebar);

async function countTeachers() {
  try {
    const teachers = await fetchTeachers();
    if (teachers.length > 0) {
      const subtitle = document.querySelector("h2");
      subtitle.innerHTML = `${teachers.length} Professores Cadastrados`;
    }
  } catch (error) {
    alert("Erro ao buscar professores: " + error.message);
  }
}
countTeachers();

const headerElement = Header({
  title: "Professores",
  subtitle: "Nenhum professor cadastrado",
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
  onClick: () => (window.location.href = "teacher-create.html"),
});
buttonDiv.appendChild(buttonCreate);

function editButton(id) {
  const button = Button({
    type: "link",
    text: "Editar",
    link: `teacher-edit.html?id=${id}`,
  });
  return button;
}

function deleteButton(id) {
  const button = Button({
    type: "link",
    text: "Excluir",
    onClick: async () => {
      const confirmDelete = confirm(
        "Tem certeza que deseja excluir este professor?"
      );
      if (!confirmDelete) return;

      try {
        await deleteUser(id);
        alert("Professor excluído com sucesso!");
        window.location.reload();
      } catch (error) {
        alert("Erro ao excluir professor: " + error.message);
      }
    },
  });
  return button;
}

async function countSubjectsByTeacher() {
  try {
    const subjects = await fetchSubjects();
    const subjectsCountByTeacher = {};

    // Contando disciplinas por professor
    subjects.forEach((subject) => {
      const teacher = subject.teacher_id;
      if (teacher && teacher._id) {
        // Verifica se teacher_id não é null
        const teacherId = teacher._id;
        if (!subjectsCountByTeacher[teacherId]) {
          subjectsCountByTeacher[teacherId] = {
            count: 0,
            name: teacher.name,
          };
        }
        subjectsCountByTeacher[teacherId].count += 1;
      }
    });

    return subjectsCountByTeacher;
  } catch (error) {
    console.error("Failed to count subjects by teacher:", error);
    return {};
  }
}

const tableDiv = document.createElement("div");
tableDiv.className = "table-teacher";

async function renderTable() {
  try {
    const [teachers, subjectsCountByTeacher] = await Promise.all([
      fetchTeachers(),
      countSubjectsByTeacher(),
    ]);

    if (Array.isArray(teachers)) {
      const rows = teachers.map((teacher) => {
        const subjectsCount = subjectsCountByTeacher[teacher._id]?.count || 0;
        return [
          teacher.enrollment,
          teacher.name,
          subjectsCount,
          editButton(teacher._id),
          deleteButton(teacher._id),
        ];
      });

      const tableDiv = document.querySelector(".table-teacher");
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

const box = Box({
  children: [headerElement, buttonDiv, tableDiv],
});

const mainContent = document.querySelector(".main-content");
mainContent.appendChild(box);
