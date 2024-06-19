const URL = "http://localhost:8080";

// Função para obter o token do localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Função para enviar o token e obter o ID do payload
async function fetchUserId() {
  const token = getToken();
  if (!token) {
    console.error("Token não encontrado");
    window.location.href = "login.html";
    return null;
  }

  try {
    const response = await fetch(`${URL}/user/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.id;
    } else {
      window.location.href = "login.html";
    }
  } catch (error) {
    console.error("Erro ao buscar o ID do usuário:", error);
    return null;
  }
}

// Função genérica para buscar dados
async function fetchData(endpoint, id) {
  const token = getToken();
  if (!token) {
    console.error("Token não encontrado");
    window.location.href = "login.html";
    return null;
  }

  try {
    const response = await fetch(`${URL}/${endpoint}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchAluno(id) {
  return fetchData("user/search", id);
}

async function fetchDisciplina(id) {
  return fetchData("subject/search", id);
}

async function fetchAlunoDisciplina(id) {
  const data = await fetchData("user_subject/search", id);
  // console.log(data[0]);
  return data;
}

function addNameTitle(aluno) {
  const welcome = document.querySelector(".name");
  welcome.innerText = `Bem vindo, ${aluno.name}`;
}

function createSubjectsOnPage(disciplina) {
  const ul = document.querySelector(".main-list");
  const liObj = document.createElement("li");
  liObj.innerHTML = `<a href="#">${disciplina.name} - ${disciplina.year}</a>`;
  ul.append(liObj);
}

async function initializePage() {
  const userId = await fetchUserId();
  if (userId) {
    const alunoDisciplinas = await fetchAlunoDisciplina(userId);
    const aluno = await fetchAluno(alunoDisciplinas[0].student_id);
    if (aluno) {
      addNameTitle(aluno);
    }
    if (alunoDisciplinas) {
      for (const element of alunoDisciplinas) {
        const disciplina = await fetchDisciplina(element.subject_id);
        if (disciplina) {
          createSubjectsOnPage(disciplina);
        }
      }
    }
  }
  // Esconde o loader e mostra o conteúdo após o carregamento completo da página
  document.querySelector(".loader-wrapper").style.display = "none";
  document.querySelector(".content").classList.add("loaded");
  document.body.style.overflow = "auto"; // Permite o scroll novamente
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    initializePage();
  } catch (error) {
    console.error("Erro durante a inicialização da página:", error);
  }
});
