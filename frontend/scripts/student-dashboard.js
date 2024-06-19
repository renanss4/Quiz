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
  loader.style.display = "none";
  content.classList.add("loaded");
  document.body.style.overflow = "auto"; // Permite o scroll novamente
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    initializePage();
  } catch (error) {
    console.error("Erro durante a inicialização da página:", error);
  }
});
