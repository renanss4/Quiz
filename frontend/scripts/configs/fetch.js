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
  } else if (response.status === 403) {
    alert("Sessão expirada, faça login novamente!");
    window.location.href = "login.html";
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
    return response.status;
  }
  return await response.json();
}

export async function fetchAluno(id) {
  const data = await fetchDataById("user/search", id);
  return data;
}

export async function fetchUser(id) {
  const data = await fetchDataById("user/search", id);
  return data;
}

export async function fetchProfessor(id) {
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

export async function fetchAllTeachers() {
  checkAuthentication();

  const response = await fetch(`${URL}/user/teachers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  // console.log(response);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Erro ao buscar professores");
  }
}

export async function fetchAllSubjects() {
  checkAuthentication();

  const response = await fetch(`${URL}/subject`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Erro ao buscar disciplinas");
  }
}

// Função para enviar o token e obter o role do payload
export async function fetchUserRole() {
  checkAuthentication();

  const response = await fetch(`${URL}/user/role`, {
    method: "GET",
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

export async function createSubject(name, teacher_id) {
  checkAuthentication();

  const data = {
    name,
    teacher_id,
  };

  // console.log(data);

  const response = await fetch(`${URL}/subject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alert("Matéria cadastrada com sucesso!");
  } else {
    alert("Erro ao cadastrar matéria.");
  }
}
