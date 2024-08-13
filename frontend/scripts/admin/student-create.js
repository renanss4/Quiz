import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Select } from "../../components/Select/Select.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { Optional } from "../../components/Optional/Optional.js";

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

const inputPassword = Input({
  label: "Senha",
  required: true,
  type: "password",
  placeholder: "********",
  name: "Senha",
  id: "student-password",
});

const createBtn = Button({
  text: "Cadastrar Aluno",
  onClick: () => {
    const name = document.getElementById("student-name").value;
    const email = document.getElementById("student-email").value;
    const enrollment = document.getElementById("student-enrollment").value;
    const password = document.getElementById("student-password").value;
    createUser(name, email, enrollment, password, "student")
      .then(() => {
        alert("Aluno cadastrado com sucesso!");
        window.location.href = "./student.html";
      })
      .catch((error) => {
        alert("Erro ao cadastrar aluno: " + error.message);
      });
  },
});

const container = Box({
  children: [
    header,
    inputName,
    inputEmail,
    inputEnrollment,
    inputPassword,
    createBtn,
  ],
});
document.body.appendChild(container);
