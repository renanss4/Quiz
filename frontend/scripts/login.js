// 0- Get the all elements
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const forgotPassword = document.getElementById("forgot-password");

// URL do backend
const URL = "http://localhost:8080";

// 1- Fetch the backend with the frontend to login
async function loginFetch(emailOrEnrollment, password) {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrEnrollment, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      return data;
    }
    if (response.status === 400) {
      alert("Usuário não encontrado!");
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      return null;
    }
    // Handle other HTTP errors if needed
    // if (!response.ok && response.status !== 400) {
    //   throw new Error("Failed to authenticate user");
    // }
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
}

// 2- Handle login button logic
loginButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // 2.0- Validate login fields before proceeding
  // 2.1- Check if emailOrEnrollment and password fields are not empty
  if (email.value.trim() === "" || password.value.trim() === "") {
    alert("Preencha todos os campos!");
    return;
  }

  // 2.2- Validate email or enrollment format (e.g., for email contains '@' and for enrollment is a number)
  if (!(email.value.includes("@") || !isNaN(email.value))) {
    console.log(isNaN(email.value));
    alert("Email ou matrícula inválidos!");
    return;
  }

  // 2.3- Validate password strength or format (e.g., minimum length)
  if (password.value.length < 8) {
    alert("Senha inválida!");
    return;
  }

  // 1- Fetch to backend for login
  const data = await loginFetch(email.value, password.value);
  if (data) {
    // 4- Manage token in local storage
    // 4.1- Store token in local storage upon successful login
    localStorage.setItem("token", data.token);

    // 2.5- Redirect to dashboard page if logged in successfully
    window.location.href = "dashboard.html";
  }
});

// pegar o token do local storage
function getToken() {
  return localStorage.getItem("token");
}

// Verifica se o token está presente no localStorage
function checkAuthentication() {
  const token = getToken();
  if (!token) {
    // Redireciona para a página de login se o token não existir
    window.location.href = "login.html";
  }
}

// Chame essa função no início de cada página protegida
checkAuthentication();

const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
  // Remove o token do localStorage
  localStorage.removeItem("token");
  // Redireciona para a página de login
  window.location.href = "login.html";
});

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token inválido ou expirado
    alert("Sessão expirada. Faça login novamente.");
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return null;
  }

  return response;
}
