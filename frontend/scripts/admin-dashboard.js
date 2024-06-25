import { fetchUser, fetchUserById } from "./configs/fetch.js";

// Função para exibir a mensagem de boas-vindas
function welcomeMessage() {
  const welcome = document.querySelector("#welcome");
  fetchUserById()
    .then((id) => fetchUser(id))
    .then((user) => {
      welcome.textContent = `Bem-vindo, ${user.name}`;
    })
    .catch((error) => {
      console.error("Erro ao buscar usuário:", error);
    });
}

welcomeMessage();

// Toggle the visibility of the shortcuts
const shortcutsButton = document.querySelector(".button-hide");
const shortcuts = document.querySelector(".atalhos");
const arrowIconDown = document.querySelector(".arrow-icon-down");
const arrowIconBack = document.querySelector(".arrow-icon-back");

shortcutsButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Toggle the visibility of the shortcuts
  shortcuts.classList.toggle("hidden");

  // Toggle the arrow icons
  arrowIconDown.classList.toggle("hidden");
  arrowIconBack.classList.toggle("hidden");
});

// Redirect to the subject page
const buttonSubject = document.querySelector("#subject");
buttonSubject.addEventListener("click", () => {
  window.location.href = "subject.html";
});

// Encerrar sessão
const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
