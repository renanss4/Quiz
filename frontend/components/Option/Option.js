export function Option({ value, text, selected = false, disabled = false }) {
  // Cria o elemento option
  const option = document.createElement("option");

  // Define o valor
  option.value = value;

  // Define o texto
  option.innerHTML = text;

  // Define se está selecionado
  if (selected) {
    option.setAttribute("selected", true);
  }

  // Define se está desabilitado
  option.disabled = disabled;

  // Adiciona a classe de estilo
  option.classList.add("select-option");

  // Retorna o elemento option
  return option;
}
