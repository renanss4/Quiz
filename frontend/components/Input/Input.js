export function Input({
  type = "text",
  placeholder = "",
  value = "",
  style = "default",
  onChange,
}) {
  // Cria o elemento input
  const input = document.createElement("input");

  // Define o tipo de input
  if (["password", "email", "number", "select"].includes(type)) {
    input.setAttribute("type", type);
  } else {
    input.setAttribute("type", "text");
  }

  // Define o placeholder e o valor
  input.setAttribute("placeholder", placeholder);
  input.value = value;

  // Adiciona o evento onChange
  input.addEventListener("input", onChange);

  // Define as classes de estilo
  const stylesByType = {
    default: "input-default",
  };

  const inputClass = stylesByType[style] || stylesByType["default"];
  input.classList.add(inputClass);

  return input;
}
