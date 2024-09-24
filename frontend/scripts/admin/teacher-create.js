import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { Optional } from "../../components/Optional/Optional.js";
import { Multiselect } from "../../components/MultiSelect/Multiselect.js";
import {
  createUser,
  fetchSubjects,
  fetchUsers,
  addTeacherToSubject,
} from "../fetch.js";

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  items: [
    // { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "#" },
    // { iconSrc: "../../assets/books.svg", text: "Painel", link: "#" },
  ],
});
nav.appendChild(sidebar);

const header = Header({
  title: "Criar Professor",
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
  placeholder: "000000",
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

const checkBox = Multiselect({
  nome: "Disciplinas",
  options: options,
  selectedOptions: [],
  onChange: (values) => {
    checkBox.selectedOptions = values;
  },
});

const createBtn = Button({
  text: "Cadastrar Professor",
  onClick: async () => {
    const name = document.getElementById("teacher-name").value;
    const email = document.getElementById("teacher-email").value;
    const enrollment = document.getElementById("teacher-enrollment").value;
    let selectedSubjects = checkBox.selectedOptions;

    if (!selectedSubjects) {
      selectedSubjects = [];
    }

    try {
      await createUser(name, email, enrollment, "teste123", "teacher");

      // busca o id do professor recém-cadastrado
      const users = await fetchUsers({ enrollment: enrollment });
      const teacher = users[0];

      if (teacher) {
        const teacherId = teacher._id;

        for (const subjectId of selectedSubjects) {
          await addTeacherToSubject(subjectId, teacherId);
        }
      }
      alert("Professor cadastrado com sucesso!");
      window.location.href = "./teacher.html";
    } catch (error) {
      alert("Erro ao cadastrar professor: " + error.message);
    }
  },
});

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
    createBtn,
    divSpace,
  ],
});
document.body.appendChild(container);
