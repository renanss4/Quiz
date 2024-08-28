export function Input({
  id = "",
  required = false,
  type = "text",
  label = "",
  placeholder = "",
  name = "",
  style = "default",
  onChange,
}) {
  // Cria o container para o input e o label
  const container = document.createElement("div");
  container.classList.add("input-container");

  // Cria o elemento de input ou textarea com base no tipo
  const input =
    type === "textarea"
      ? document.createElement("textarea")
      : document.createElement("input");

  // Define um ID para o input
  if (id) {
    input.id = id;
  }

  // Tratando o caso de input obrigatório
  if (required) {
    input.required = true;
  }

  // Define o label
  if (label) {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", input.id);
    labelElement.textContent = label;
    labelElement.classList.add("input-label");
    container.appendChild(labelElement);
  }

  // Define o tipo de input, incluindo suporte para 'date'
  if (["password", "email", "date"].includes(type)) {
    input.setAttribute("type", type);
  } else {
    input.setAttribute("type", type);
  }

  // Define o placeholder e o nome
  input.setAttribute("placeholder", placeholder);
  input.name = name;

  // Adiciona o evento onChange
  input.addEventListener("input", onChange);

  // Define as classes de estilo
  const stylesByType = {
    default: "input-default",
    textarea: "textarea-default",
  };

  const inputClass = stylesByType[style] || stylesByType["default"];
  input.classList.add(inputClass);

  // Adiciona o input ao container
  container.appendChild(input);

  return container;
}
