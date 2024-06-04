async function fetchAluno(id) {
  const alunos = await fetch(`http://127.0.0.1:8080/users/${id}`, {
    method: "GET",
  });

  const formatAlunos = await alunos.json();
  return formatAlunos;
}

const aluno = fetchAluno("665e1d76b9d3fe0a7f7028fb");
console.log(aluno);
aluno.then((resp) => addNameTitle(resp));

function addNameTitle(aluno) {
  const welcome = document.querySelector(".name");
  welcome.innerText = `Bem vindo, ${aluno.name}`;
}

// addNameTitle(nome);
