export function CardItem({ question, answer, type = "default", link = null }) {
  const cardItem = document.createElement("div");
  cardItem.classList.add("card-item");

  const questionElement = document.createElement("p");
  questionElement.textContent = question;
  questionElement.classList.add("question");

  const answerElement = document.createElement("p");
  answerElement.textContent = answer;
  answerElement.classList.add("answer");

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
