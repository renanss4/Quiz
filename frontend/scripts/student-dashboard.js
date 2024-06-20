import {
  fetchAlunoDisciplina,
  fetchDisciplina,
  fetchAluno,
  fetchUserById,
} from "./configs/fetch.js";

const welcome = document.querySelector(".name");
const ul = document.querySelector(".main-list");
const loader = document.querySelector(".loader-wrapper");
const content = document.querySelector(".content");
const noContent = document.querySelector(".no-content");

function addNameTitle(aluno) {
  welcome.innerText = `Bem vindo, ${aluno.name}`;
}

function createSubjectsOnPage(disciplina) {
  const liObj = document.createElement("li");
  liObj.innerHTML = `<a href="#">${disciplina.name} - ${disciplina.year}</a>`;
  ul.append(liObj);
}

async function initializePage() {
  const userId = await fetchUserById();
  if (userId) {
    // Esconde o loader e mostra o conteúdo após o carregamento completo da página
    loader.style.display = "none";
    content.classList.add("loaded");

    const dadosAluno = await fetchAluno(userId);
    if (dadosAluno) {
      addNameTitle(dadosAluno);
    }

    const disciplinasAluno = await fetchAlunoDisciplina(userId);
    if (disciplinasAluno === 404) {
      // remove ul.main-list
      ul.remove();
      return null;
    }

    if (disciplinasAluno.length > 0) {
      for (const element of disciplinasAluno) {
        const disciplina = await fetchDisciplina(element.subject_id);
        if (disciplina) {
          createSubjectsOnPage(disciplina);
        }
      }
      noContent.style.display = "none"; // Esconde a mensagem de "sem dados" se houver disciplinas
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await initializePage();
  } catch (error) {
    console.error("Erro durante a inicialização da página:", error);
  }
});
