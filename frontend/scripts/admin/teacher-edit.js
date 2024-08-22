import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { Multiselect } from "../../components/MultiSelect/Multiselect.js";
import {
  editUser,
  fetchTeachers,
  fetchSubjects,
  addTeacherToSubject,
  removeTeacherFromSubject,
} from "../fetch.js";

const urlParams = new URLSearchParams(window.location.search);
const teacherId = urlParams.get("id");

if (!teacherId) {
  alert("ID do professor não fornecido");
  window.location.href = "./teacher.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  const nav = document.querySelector(".nav");
  const sidebar = Sidebar({
    items: [
      { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "#" },
      { iconSrc: "../../assets/books.svg", text: "Painel", link: "#" },
    ],
  });
  nav.appendChild(sidebar);

  const header = Header({
    title: "Editar Professor",
    subtitle: "",
    btnBack: true,
    linkBack: "./teacher.html",
  });

  const inputName = Input({
    label: "Nome Completo",
    required: true,
    type: "text",
    placeholder: "Nome Sobrenome",
    name: "Nome",
    id: "teacher-name",
  });

  const inputEmail = Input({
    label: "Email",
    required: true,
    type: "email",
    placeholder: "email@email.com",
    name: "Email",
    id: "teacher-email",
  });

  const inputEnrollment = Input({
    label: "Matrícula",
    required: true,
    type: "text",
    placeholder: "123456",
    name: "Matrícula",
    id: "teacher-enrollment",
  });

  async function getOptions() {
    const subjects = await fetchSubjects();
    return subjects.map((subject) => ({
      value: subject._id,
      label: subject.name,
    }));
  }
  const options = await getOptions();

  const multiselect = Multiselect({
    nome: "Disciplinas",
    options: options,
    selectedOptions: [],
    onChange: (values) => {
      multiselect.selectedOptions = values;
    },
  });

  async function updateTeacherSubjects(teacherId, selectedSubjects) {
    const allSubjects = await fetchSubjects();

    if (!Array.isArray(allSubjects) || allSubjects.length === 0) {
      return;
    }

    // Filtra as disciplinas que têm o professor atualmente
    const previousSubjects = allSubjects
      .filter(
        (subject) => subject.teacher_id && subject.teacher_id._id === teacherId
      )
      .map((subject) => subject._id);

    // Disciplinas que devem ser adicionadas ao professor
    const subjectsToAdd = selectedSubjects.filter(
      (id) => !previousSubjects.includes(id)
    );

    // Disciplinas que devem ser removidas do professor
    const subjectsToRemove = previousSubjects.filter(
      (id) => !selectedSubjects.includes(id)
    );

    // Adiciona o professor às disciplinas selecionadas
    for (const subjectId of subjectsToAdd) {
      await addTeacherToSubject(subjectId, teacherId);
    }

    // Remove o professor das disciplinas não selecionadas
    for (const subjectId of subjectsToRemove) {
      await removeTeacherFromSubject(subjectId);
    }
  }

  const saveBtn = Button({
    text: "Salvar Alterações",
    onClick: async () => {
      const name = document.getElementById("teacher-name").value;
      const email = document.getElementById("teacher-email").value;
      const enrollment = document.getElementById("teacher-enrollment").value;

      const subjects = multiselect.selectedOptions;

      try {
        await editUser(teacherId, name, email, enrollment, "teacher");
        await updateTeacherSubjects(teacherId, subjects);

        alert("Professor atualizado com sucesso!");
        window.location.href = "./teacher.html";
      } catch (error) {
        console.error("Failed to edit teacher:", error);
        alert("Erro ao atualizar professor");
      }
    },
  });

  async function loadTeacherData() {
    try {
      const teachers = await fetchTeachers();
      const teacher = teachers.find((teacher) => teacher._id === teacherId);

      if (!teacher) {
        throw new Error("Professor não encontrado");
      }

      document.getElementById("teacher-name").value = teacher.name;
      document.getElementById("teacher-email").value = teacher.email;
      document.getElementById("teacher-enrollment").value = teacher.enrollment;

      const selectedOptions = await fetchSubjects({
        teacher_id: teacherId,
      });

      multiselect.querySelectorAll("input[type=checkbox]").forEach((input) => {
        const isSelected = selectedOptions.some(
          (subject) => subject._id === input.value
        );

        if (isSelected) {
          input.checked = true;
        }
      });
    } catch (error) {
      console.error("Failed to load teacher data:", error);
      alert("Erro ao carregar dados do professor");
    }
  }

  const container = Box({
    children: [
      header,
      inputName,
      inputEmail,
      inputEnrollment,
      multiselect,
      saveBtn,
    ],
  });
  document.body.appendChild(container);

  await loadTeacherData();
});
