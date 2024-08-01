export function CardItem({ question, answer, type = "default" }) {
  const cardItem = document.createElement("div"); // Mudança de <span> para <div>
  cardItem.classList.add("card-item");

  const questionElement = document.createElement("p");
  questionElement.textContent = question;

  const answerElement = document.createElement("p");
  answerElement.textContent = answer;

  const stylesByType = {
    default: "card-item-default",
    error: "card-item-error",
  };

  const cardItemClass = stylesByType[type];
  cardItem.classList.add(cardItemClass);

  cardItem.appendChild(questionElement);
  cardItem.appendChild(answerElement);

  return cardItem;
}
