import { Sidebar } from "../../components/Sidebar/Sidebar.js";
import { Header } from "../../components/Header/Header.js";
import { Input } from "../../components/Input/Input.js";
import { Button } from "../../components/Button/Button.js";
import { Box } from "../../components/Box/Box.js";
import { editUser, fetchStudents } from "../fetch.js";

// Extrai o studentId da URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get("id");

if (!studentId) {
  alert("ID do aluno não fornecido");
  window.location.href = "./student.html";
}

document.addEventListener("DOMContentLoaded", async () => {
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
    title: "Editar Aluno",
    subtitle: "",
    btnBack: true,
    linkBack: "./student.html",
  });

  // Cria e configura os campos de input
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

  // Cria e configura o botão de salvar alterações
  const saveBtn = Button({
    text: "Salvar Alterações",
    onClick: () => {
      const name = document.getElementById("student-name").value;
      const email = document.getElementById("student-email").value;
      const enrollment = document.getElementById("student-enrollment").value;
      editUser(studentId, name, email, enrollment, "student")
        .then(() => {
          alert("Aluno editado com sucesso!");
          window.location.href = "./student.html";
        })
        .catch((error) => {
          alert("Erro ao editar aluno: " + error.message);
        });
    },
  });

  // Função assíncrona para carregar os dados do aluno
  async function loadStudentData() {
    try {
      const students = await fetchStudents();
      const student = students.find((s) => s._id === studentId);

      if (!student) {
        throw new Error("Aluno não encontrado");
      }

      // Atualiza os valores dos campos
      document.getElementById("student-name").value = student.name;
      document.getElementById("student-email").value = student.email;
      document.getElementById("student-enrollment").value = student.enrollment;
    } catch (error) {
      alert("Erro ao carregar dados do aluno: " + error.message);
      window.location.href = "./student.html";
    }
  }

  // Adiciona o Box ao corpo do documento após carregar os dados
  const container = Box({
    children: [header, inputName, inputEmail, inputEnrollment, saveBtn],
  });

  document.body.appendChild(container);

  // Carrega os dados do aluno após renderizar o Box
  await loadStudentData();
});
