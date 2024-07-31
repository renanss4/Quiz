import { setToken } from "./configs/tokenManager.js";
import { loginFetch, fetchUserRole } from "./configs/fetch.js";
import { Button } from "../components/Button/Button.js";
import { Input } from "../components/Input/Input.js";

// Função para validar os campos
function validateFields() {
  const email = emailInput.querySelector("input");
  const password = passwordInput.querySelector("input");
  let isValid = true;

  if (!email.value) {
    email.style.border = "1px solid red";
    isValid = false;
  }

  if (!password.value) {
    password.style.border = "1px solid red";
    isValid = false;
  }

  return isValid;
}

// Função para tratar mudanças nos inputs
function handleInputChange() {
  const incorrect = document.getElementById("error");
  incorrect.style.display = "none";
  emailInput.querySelector("input").style.border = "1px solid #ccc";
  passwordInput.querySelector("input").style.border = "1px solid #ccc";
}

// Função para tratar o login
async function handleLogin(event) {
  event.preventDefault();

  // Validando os campos
  if (!validateFields()) {
    return;
  }

  try {
    const email = emailInput.querySelector("input").value;
    const password = passwordInput.querySelector("input").value;
    const data = await loginFetch(email, password);
    if (data) {
      setToken(data.token);
      const role = await fetchUserRole();
      if (role === "student") {
        window.location.href = "student-dashboard.html";
      } else if (role === "teacher") {
        window.location.href = "teacher-dashboard.html";
      } else {
        window.location.href = "admin-dashboard.html";
      }
    }
  } catch (error) {
    const incorrect = document.getElementById("error");
    if (error.message === "User invalid!") {
      incorrect.style.display = "block";
      incorrect.innerText = "Usuário inválido!";
    } else if (error.message === "User not found!") {
      incorrect.style.display = "block";
      incorrect.innerText = "Usuário não cadastrado!";
    } else {
      console.error(`Error: ${error}`);
    }
  }
}

// Criando instâncias dos componentes
const emailInput = Input({
  id: "email",
  required: true,
  type: "text",
  placeholder: "usuario@email.com",
  label: "Email",
  onChange: handleInputChange,
});

const passwordInput = Input({
  id: "password",
  required: true,
  type: "password",
  placeholder: "••••••••••••",
  label: "Senha",
  onChange: handleInputChange,
});

const loginButton = Button({
  id: "login-button",
  size: "full",
  text: "Entrar",
  onClick: handleLogin,
});

// Inserindo os componentes no DOM
document.getElementById("email-container").appendChild(emailInput);
document.getElementById("password-container").appendChild(passwordInput);
document.getElementById("login-button-container").appendChild(loginButton);

// Lógica para alternar visibilidade da senha
const togglePassword = document.getElementById("toggle-password");
const showPasswordImg = document.getElementById("show-password");
const hidePasswordImg = document.getElementById("hide-password");

togglePassword.addEventListener("click", (event) => {
  event.preventDefault();
  const passwordInputField = passwordInput.querySelector("input");
  const type =
    passwordInputField.getAttribute("type") === "password"
      ? "text"
      : "password";
  passwordInputField.setAttribute("type", type);

  if (type === "text") {
    showPasswordImg.hidden = true;
    hidePasswordImg.hidden = false;
  } else {
    showPasswordImg.hidden = false;
    hidePasswordImg.hidden = true;
  }
});
