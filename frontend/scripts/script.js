async function fetchAluno(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8080/users/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Erro ao buscar aluno: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function fetchDisciplina(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8080/subjects/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Erro ao buscar disciplina: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function fetchAlunoDisciplina(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8080/users_subjects/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar aluno_disciplina: ${response.statusText}`
      );
    }
    const formatResponse = await response.json();
    return formatResponse.userSubjectAlreadyExists;
  } catch (error) {
    console.error(error);
  }
}

function addNameTitle(aluno) {
  const welcome = document.querySelector(".name");
  welcome.innerText = `Bem vindo, ${aluno.name}`;
}

function createSubjectsOnPage(Disciplina) {
  // console.log(Disciplina);
  const ul = document.querySelector(".main-list");
  // const li = `<li></li>`;
  const liObj = document.createElement("li");
  liObj.innerHTML = `<a href="#">${Disciplina.name} - ${Disciplina.year}</a>`;
  ul.append(liObj);
}

// const aluno = fetchAluno("665f294276fdcedd4a693ac0").then((aluno) =>
//   addNameTitle(aluno)
// );
// const disciplina = fetchDisciplina("665e1da1b9d3fe0a7f702900").then(
//   (disciplina) => createSubjectsOnPage(disciplina)
// );

const aluno_disciplina = fetchAlunoDisciplina("665f294276fdcedd4a693ac0").then(
  (arr) =>
    arr.forEach((element) => {
      const aluno_id = element.user_id;
      fetchAluno(aluno_id).then((nome) => addNameTitle(nome));

      const disciplina_id = element.subject_id;
      fetchDisciplina(disciplina_id).then((disciplina) => {
        createSubjectsOnPage(disciplina);
      });
      // console.log(disciplina);
    })
);
