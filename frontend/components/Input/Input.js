export function Input({
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

  // Cria o elemento input
  const input = document.createElement("input");

  // Define um ID único para o input
  const inputId = `input-${name}-${Math.random().toString(36).substr(2, 9)}`;
  input.setAttribute("id", inputId);

  // Define o label
  if (label) {
    const labelElement = document.createElement("label");
    labelElement.setAttribute("for", inputId);
    labelElement.textContent = label;
    labelElement.classList.add("input-label");
    container.appendChild(labelElement);
  }

  // Define o tipo de input
  if (["password", "email"].includes(type)) {
    input.setAttribute("type", type);
  } else {
    input.setAttribute("type", "text");
  }

  // Define o placeholder e o valor
  input.setAttribute("placeholder", placeholder);
  input.name = name;

  // Adiciona o evento onChange
  input.addEventListener("input", onChange);

  // Define as classes de estilo
  const stylesByType = {
    default: "input-default",
  };

  const inputClass = stylesByType[style] || stylesByType["default"];
  input.classList.add(inputClass);

  // Adiciona o input ao container
  container.appendChild(input);

  return container;
}
