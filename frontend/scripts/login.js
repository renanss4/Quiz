import { setToken, decodeToken } from "./tokenManager.js";
import { loginFetch } from "./fetch.js";
import { Button } from "../components/Button/Button.js";
import { Input } from "../components/Input/Input.js";

// Função para validar os campos
function validateFields(email, password) {
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

  const emailInputField = emailInput.querySelector("input");
  const passwordInputField = passwordInput.querySelector("input");

  // Validando os campos
  if (!validateFields(emailInputField, passwordInputField)) {
    return;
  }

  const emailOrEnrollment = emailInputField.value;
  const password = passwordInputField.value;

  let email = null;
  let enrollment = null;

  if (emailOrEnrollment.includes("@")) {
    email = emailOrEnrollment;
  } else {
    enrollment = emailOrEnrollment;
  }

  try {
    const data = await loginFetch(email, enrollment, password);
    if (data) {
      setToken(data.token);
      const decodedToken = decodeToken(data.token);
      const userRole = decodedToken.role;
      if (userRole === "student") {
        window.location.href = "./student/student-dashboard.html";
      } else if (userRole === "teacher") {
        window.location.href = "./teacher/teacher-dashboard.html";
      } else {
        window.location.href = "./admin/admin-dashboard.html";
      }
    }
  } catch (error) {
    const incorrect = document.getElementById("error");
    incorrect.style.display = "block";
    incorrect.textContent = "Login failed: " + error.message;
    console.error("Login ou Fetch falhou:", error);
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

document.getElementById("forgot-password").removeAttribute("href");
