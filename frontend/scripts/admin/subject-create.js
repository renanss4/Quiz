
// 5- Função para enviar os dados do form
buttonSubmit.addEventListener("click", async (event) => {
    event.preventDefault();
  
    // Verificar se o campo de disciplina está vazio
    if (!fieldSubject.value) {
      fieldSubject.style.border = "1px solid red";
      fieldTeacher.style.border = "1px solid red";
      divError.style.display = "block";
      divError.textContent = "Preencha todos os campos.";
      return;
    }
  
    // Verificar se o professor está selecionado
    if (!fieldTeacher.value) {
      fieldSubject.style.border = "1px solid red";
      fieldTeacher.style.border = "1px solid red";
      divError.style.display = "block";
      divError.textContent = "Selecione um professor.";
      return;
    }
  
    const selectedTeacher =
      fieldTeacher.options[fieldTeacher.selectedIndex].value;
    const teacherId = selectedTeacher === "none" ? null : selectedTeacher;
  
    if (isEditing) {
      await editSubject(currentSubjectId, fieldSubject.value, teacherId);
    } else {
      // Verificar se a disciplina já existe
      const subjectExists = await checkSubject(fieldSubject.value);
      if (subjectExists) {
        divError.style.display = "block";
        divError.textContent = "Disciplina já cadastrada.";
        return;
      }
      await createSubject(fieldSubject.value, teacherId);
    }
  
    hideForm();
    loadSubjects();
  });
  
  // 7- Função para mostrar as disciplinas cadastradas na tela
  async function loadSubjects() {
    try {
      const subjects = await fetchAllSubjects();
      if (subjects.length > 0) {
        countSubject.textContent = `${subjects.length} Disciplinas Cadastradas`;
      } else {
        countSubject.textContent = `Nenhuma disciplina cadastrada`;
      }
      displaySubjects(subjects);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  }

  
function clearFields() {
    fieldSubject.value = "";
    fieldTeacher.value = "";
    divError.style.display = "none";
    fieldSubject.style.border = "1px solid #ccc";
    fieldTeacher.style.border = "1px solid #ccc";
  }
  
  fieldSubject.addEventListener("focus", clearFields);
  fieldTeacher.addEventListener("focus", clearFields);

  
// função para verificar se já existe a disciplina
async function checkSubject(subject) {
    const subjects = await fetchAllSubjects();
    if (!subjects.length) return null;
    return subjects.find((s) => s.name === subject);
  }
  