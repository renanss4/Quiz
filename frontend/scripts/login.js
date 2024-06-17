import { getToken, setToken } from "./configs/tokenManager.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const inputIncorrect = document.getElementById("error");
const forgotPassword = document.getElementById("forgot-password");

// URL do backend
const URL = "http://localhost:8080";

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
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      return null;
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
}

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();

  if (email.value.trim() === "" || password.value.trim() === "") {
    inputIncorrect.style.display = "block";
    email.style.border = "1px solid red";
    password.style.border = "1px solid red";
    return;
  }
  if (!(email.value.includes("@") || !isNaN(email.value))) {
    console.log(isNaN(email.value));
    inputIncorrect.style.display = "block";
    email.style.border = "1px solid red";
    password.style.border = "1px solid red";
    return;
  }

  const data = await loginFetch(email.value, password.value);
  if (data) {
    setToken(data.token);

    window.location.href = "dashboard.html";
  }
});
