import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { Optional } from "../../components/Optional/Optional.js";
import { Multiselect } from "../../components/MultiSelect/Multiselect.js";
import {
  fetchSubjects,
  createUser,
  createStudentSubject,
  fetchUsers,
} from "../fetch.js";

const nav = document.querySelector(".nav");
const sidebar = Sidebar({
  items: [
    { iconSrc: "../../assets/house.svg", text: "Dashboard", link: "#" },
    { iconSrc: "../../assets/books.svg", text: "Painel", link: "#" },
  ],
});
nav.appendChild(sidebar);

const header = Header({
  title: "Criar Aluno",
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
    // console.log("Selected values:", values);
    checkBox.selectedOptions = values;
  },
});

const createBtn = Button({
  text: "Cadastrar Aluno",
  onClick: async () => {
    const name = document.getElementById("student-name").value;
    const email = document.getElementById("student-email").value;
    const enrollment = document.getElementById("student-enrollment").value;

    try {
      // Cria o usuário
      await createUser(name, email, enrollment, "teste123", "student");

      // Busca o ID do aluno recém-criado
      const users = await fetchUsers({ enrollment: enrollment });
      const student = users[0];

      if (student) {
        const studentId = student._id;

        // Cria a relação entre aluno e disciplinas
        const selectedOptions = checkBox.selectedOptions;
        for (const subjectId of selectedOptions) {
          await createStudentSubject(studentId, subjectId);
        }

        alert("Aluno cadastrado com sucesso!");
        window.location.href = "./student.html";
      } else {
        throw new Error("Aluno não encontrado após criação.");
      }
    } catch (error) {
      alert("Erro ao cadastrar aluno: " + error.message);
    }
  },
});

const container = Box({
  children: [
    header,
    inputName,
    inputEmail,
    inputEnrollment,
    checkBox,
    createBtn,
  ],
});
document.body.appendChild(container);
