export function CardItem({
  question,
  answer,
  isCorrect = null,
  type = "default",
  link = null,
}) {
  const cardItem = document.createElement("div");
  cardItem.classList.add("card-item");

  const questionElement = document.createElement("p");
  questionElement.textContent = question;
  questionElement.classList.add("question");

  const answerElement = document.createElement("p");
  answerElement.textContent = answer; // Exibir a opção de resposta no card
  answerElement.classList.add("answer");

  // Aplicando a cor com base na resposta correta ou incorreta
  if (isCorrect === true) {
    answerElement.style.color = "green"; // Cor verde para respostas corretas
  } else if (isCorrect === false) {
    answerElement.style.color = "red"; // Cor vermelha para respostas incorretas
  }

  const stylesByType = {
    default: "card-item-default",
  };
  const cardItemClass = stylesByType[type];
  cardItem.classList.add(cardItemClass);

  cardItem.appendChild(questionElement);
  cardItem.appendChild(answerElement);

  if (link) {
    const linkButton = document.createElement("button");
    linkButton.textContent = "Ver Gabarito";
    linkButton.classList.add("view-answer-button");
    linkButton.addEventListener("click", () => {
      window.location.href = link;
    });
    cardItem.appendChild(linkButton);
  }

  return cardItem;
}
