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
