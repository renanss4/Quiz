import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { Multiselect } from "../../components/MultiSelect/Multiselect.js";
import {
  editUser,
  fetchStudents,
  fetchSubjects,
  fetchStudentSubjects,
  createStudentSubject,
  deleteStudentSubject,
} from "../fetch.js";

// Extrai o studentId da URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get("id");

if (!studentId) {
  alert("ID do aluno não fornecido");
  window.location.href = "./student.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  const nav = document.querySelector(".nav");
  const sidebar = Sidebar({
    items: [
      // { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "#" },
      // { iconSrc: "../../assets/books.svg", text: "Painel", link: "#" },
    ],
  });
  nav.appendChild(sidebar);

  const header = Header({
    title: "Editar Aluno",
    subtitle: "",
    btnBack: true,
    linkBack: "./student.html",
  });

  const inputName = Input({
    label: "Nome Completo",
    required: true,
    type: "text",
    placeholder: "Nome Sobrenome",
    name: "Nome",
    id: "student-name",
  });

  const inputEmail = Input({
    label: "Email",
    required: true,
    type: "email",
    placeholder: "email@email.com",
    name: "Email",
    id: "student-email",
  });

  const inputEnrollment = Input({
    label: "Matrícula",
    required: true,
    type: "text",
    placeholder: "000000",
    name: "Matrícula",
    id: "student-enrollment",
  });

  async function getOptions() {
    const subjects = await fetchSubjects();
    return subjects.map((subject) => ({
      value: subject._id,
      label: subject.name,
    }));
  }
  const options = await getOptions();

  const checkBox = Multiselect({
    nome: "Disciplinas",
    options: options,
    selectedOptions: [],
    onChange: (values) => {
      checkBox.selectedOptions = values;
    },
  });

  async function syncStudentSubjects() {
    const studentSubjects = await fetchStudentSubjects({
      student_id: studentId,
    });
    const selectedSubjectIds = checkBox.selectedOptions;

    if (!selectedSubjectIds) {
      return;
    }

    // Excluir disciplinas não selecionadas
    for (const subject of studentSubjects) {
      if (!selectedSubjectIds.includes(subject.subject_id)) {
        await deleteStudentSubject(subject._id);
      }
    }

    // Adicionar disciplinas selecionadas
    for (const subjectId of selectedSubjectIds) {
      const alreadyAdded = studentSubjects.some(
        (subject) => subject.subject_id === subjectId
      );
      if (!alreadyAdded) {
        await createStudentSubject(studentId, subjectId);
      }
    }
  }

  const saveBtn = Button({
    text: "Salvar Alterações",
    onClick: async () => {
      const name = document.getElementById("student-name").value;
      const email = document.getElementById("student-email").value;
      const enrollment = document.getElementById("student-enrollment").value;

      try {
        await editUser(studentId, name, email, enrollment, "student");
        await syncStudentSubjects();
        alert("Aluno editado com sucesso!");
        window.location.href = "./student.html";
      } catch (error) {
        alert("Erro ao editar aluno: " + error.message);
      }
    },
  });

  async function loadStudentData() {
    try {
      const students = await fetchStudents();
      const student = students.find((s) => s._id === studentId);

      if (!student) {
        throw new Error("Aluno não encontrado");
      }

      document.getElementById("student-name").value = student.name;
      document.getElementById("student-email").value = student.email;
      document.getElementById("student-enrollment").value = student.enrollment;

      const studentSubjects = await fetchStudentSubjects({
        student_id: studentId,
      });
      const selectedSubjectIds = studentSubjects.map((s) => s.subject_id);

      checkBox.querySelectorAll("input[type=checkbox]").forEach((input) => {
        const isSelected = selectedSubjectIds.some(
          (subject) => subject._id === input.value
        );
        if (isSelected) {
          input.checked = true;
        }
      });
    } catch (error) {
      alert("Erro ao carregar dados do aluno: " + error.message);
      window.location.href = "./student.html";
    }
  }

  const divSpace = document.createElement("div");
  divSpace.classList.add("space");
  divSpace.style.padding = "1.5rem";

  const container = Box({
    children: [
      header,
      inputName,
      inputEmail,
      inputEnrollment,
      checkBox,
      saveBtn,
      divSpace,
    ],
  });

  document.body.appendChild(container);

  await loadStudentData();
});
