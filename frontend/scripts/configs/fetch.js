import { checkAuthentication, getToken } from "./tokenManager.js";

// URL do backend
const URL = "http://localhost:8080";

// Function to fetch the login data
export async function loginFetch(emailOrEnrollment, password) {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailOrEnrollment, password }),
  });

  //   console.log(response);
  const data = await response.json();

  if (response.status === 404) {
    if (data.msg === "Invalid password!") {
      throw new Error("User invalid!");
    } else {
      throw new Error("User not found!");
    }
  }

  return data;
}

// Função para enviar o token e obter o ID do payload
export async function fetchUserById() {
  checkAuthentication();

  const response = await fetch(`${URL}/user/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.id;
  }
}

export async function fetchDataById(endpoint, id) {
  checkAuthentication();

  const response = await fetch(`${URL}/${endpoint}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${endpoint}: ${response.statusText}`);
  }
  return await response.json();
}

export async function fetchAluno(id) {
  const data = await fetchDataById("user/search", id);
  return data;
}

export async function fetchDisciplina(id) {
  const data = await fetchDataById("subject/search", id);
  return data;
}

export async function fetchAlunoDisciplina(id) {
  const data = await fetchDataById("user_subject/search", id);
  return data;
}

// Função para enviar o token e obter o role do payload
export async function fetchUserRole() {
  checkAuthentication();

  const response = await fetch(`${URL}/user/role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.role;
  }
}
