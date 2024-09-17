import { Box } from "../components/Box/Box.js";
import { Button } from "../components/Button/Button.js";
import { Card } from "../components/Card/Card.js";
// import { CardItem } from "../components/CardItem/CardItem.js";
import { Dialog } from "../components/Dialog/Dialog.js";
import { Header } from "../components/Header/Header.js";
import { Input } from "../components/Input/Input.js";
import { Multiselect } from "../components/Multiselect/Multiselect.js";
import { Optional } from "../components/Optional/Optional.js";
import { Select } from "../components/Select/Select.js";
import { Sidebar } from "../components/SideBar/SideBar.js";
import { Table } from "../components/Table/Table.js";
import { Tag } from "../components/Tag/Tag.js";
import { Toaster } from "../components/Toaster/Toaster.js";
import { Timer } from "../components/Timer/Timer.js";

function teste() {
  alert("Você clicou no botão!");
}
function handleSelectionChange(selectedItems) {
  console.log("Selected items:", selectedItems);
}
// Função para lidar com mudanças no input de data
const handleDateChange = (event) => {
  const dateValue = event.target.value;
  console.log(`Data alterada para: ${dateValue}`);
};

// Função para lidar com mudanças no textarea
const handleDescriptionChange = (event) => {
  const descriptionValue = event.target.value;
  console.log(`Descrição alterada para: ${descriptionValue}`);
};
document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");

  const sidebarTest = Sidebar({
    itens: [
      // { iconSrc: "../assets/house.svg", text: "Dashboard", link: "#" },
      // { iconSrc: "../assets/books.svg", text: "Painel", link: "#" },
    ],
  });
  body.appendChild(sidebarTest);
  const boxTestMain = Box({
    // children: [
    //   Input({
    //     type: "radio",
    //     name: "testRadio", // nome para agrupar os radio buttons
    //     id: "testRadio_1", // id único para cada radio
    //     options: [
    //       { label: "Opção 1", value: "1" },
    //       { label: "Opção 2", value: "2" },
    //       { label: "Opção 3", value: "3" },
    //       { label: "Opção 4", value: "4" },
    //     ],
    //     onChange: (e) => {
    //       console.log(e.target.value);
    //     }, // Loga o valor selecionado
    //   }),
    //   Timer({ time: 190, onTimeEnd: teste }),
    //   Card({
    //     type: "answers",
    //     cardItems: [
    //       { question: "Pergunta 1", answer: "Resposta 1" },
    //       { question: "Pergunta 2", answer: "Resposta 2" },
    //       { question: "Pergunta 3", answer: "Resposta 3" },
    //       { question: "Pergunta 4", answer: "Resposta 4" },
    //       { question: "Pergunta 5", answer: "Resposta 5" },
    //       { question: "Pergunta 6", answer: "Resposta 6" },
    //       { question: "Pergunta 7", answer: "Resposta 7" },
    //       { question: "Pergunta 8", answer: "Resposta 8" },
    //       { question: "Pergunta 9", answer: "Resposta 9" },
    //       { question: "Pergunta 10", answer: "Resposta 10" },
    //     ],
    //   }),
    //   Input({
    //     type: "textareaGroup",
    //     placeholder: "Digite uma resposta",
    //     name: "responses",
    //     onChange: handleDescriptionChange,
    //   }),
    //   Input({
    //     type: "date",
    //     label: "Data",
    //     placeholder: "Digite a data",
    //     name: "date",
    //     onChange: handleDateChange,
    //   }),
    //   Input({
    //     type: "textarea",
    //     label: "Descrição",
    //     placeholder: "Digite a descrição",
    //     name: "description",
    //     onChange: handleDescriptionChange,
    //   }),
    //   Multiselect({
    //     nome: "Multiselect",
    //     options: [
    //       { value: "1", label: "Opção 1" },
    //       { value: "2", label: "Opção 2" },
    //       { value: "3", label: "Opção 3" },
    //       { value: "4", label: "Opção 4" },
    //       { value: "5", label: "Opção 5" },
    //       { value: "6", label: "Opção 6" },
    //     ],
    //     selectedOptions: [],
    //     onChange: handleSelectionChange,
    //   }),
    //   Optional({
    //     text: "Opcional 1",
    //     info: "Informação 1",
    //   }),
    //   Button({
    //     type: "default",
    //     size: "normal",
    //     imgSrc: "../assets/create.svg",
    //     text: "Teste 1",
    //     onClick: teste,
    //   }),
    //   Button({
    //     type: "outline",
    //     size: "full",
    //     text: "Teste 2",
    //     onClick: teste,
    //   }),
    //   Button({
    //     type: "destructive",
    //     size: "mid",
    //     text: "Teste 3",
    //     onClick: teste,
    //   }),
    //   Button({
    //     type: "destructive-outline",
    //     text: "Teste 4",
    //     onClick: teste,
    //   }),
    //   Button({
    //     type: "link",
    //     text: "Teste 5",
    //     link: "#",
    //   }),
    //   Toaster({
    //     iconSrc: "../assets/success.svg",
    //     type: "success",
    //     title: "Sucesso!",
    //     message: "Tal ação foi realizada com sucesso.",
    //     onClose: teste,
    //   }),
    //   Toaster({
    //     iconSrc: "../assets/warning.svg",
    //     type: "warning",
    //     title: "Atenção!",
    //     message: "Esta é uma mensagem informativa.",
    //     onClose: teste,
    //   }),
    //   Dialog({
    //     title: "Teste 1",
    //     message:
    //       "fusyiahdiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaadsioçad",
    //     buttons: [
    //       {
    //         type: "outline",
    //         text: "Cancelar",
    //         onClick: teste,
    //       },
    //       {
    //         type: "destructive",
    //         text: "Confirmar",
    //         onClick: teste,
    //       },
    //     ],
    //   }),
    //   Dialog({
    //     title: "Teste 2",
    //     message: "fusyiahdidsioçad",
    //     buttons: [
    //       {
    //         type: "default",
    //         text: "Cancelar",
    //         onClick: teste,
    //       },
    //       {
    //         type: "destructive",
    //         text: "Confirmar",
    //         onClick: teste,
    //       },
    //     ],
    //   }),
    //   Dialog({
    //     title: "Teste 3",
    //     message:
    //       "fusyiahdidsioçajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjf jjjjjjjjjjjjjjjjjjjjjjjjj jjjhhhhhhhhhhhhhhhhhhhhd",
    //     buttons: [
    //       {
    //         type: "default",
    //         text: "Cancelar",
    //         onClick: teste,
    //       },
    //       {
    //         type: "destructive",
    //         text: "Confirmar",
    //         onClick: teste,
    //       },
    //     ],
    //   }),
    //   Header({
    //     title: "Título",
    //     subtitle: "Subtítulo",
    //   }),
    //   Header({
    //     title: "Título",
    //     subtitle: "Subtítulo",
    //     btnBack: true,
    //     linkBack: "#",
    //   }),
    //   Tag({
    //     text: "Tag 1",
    //   }),
    //   Tag({
    //     text: "Tag 2",
    //   }),
    //   Table({
    //     headers: ["Nome", "Idade", "Sexo", "Tags", "Ações"],
    //     rows: [
    //       [
    //         "João",
    //         20,
    //         "Masculino",
    //         Tag({ text: "Tag 1" }),
    //         Button({ type: "link", text: "Editar", link: "#" }),
    //         Button({ type: "link", text: "Excluir", link: "#" }),
    //       ],
    //       [
    //         "Maria",
    //         25,
    //         "Feminino",
    //         Tag({ text: "Tag 4" }),
    //         Button({ type: "link", text: "Editar", link: "#" }),
    //         Button({ type: "link", text: "Excluir", link: "#" }),
    //       ],
    //     ],
    //   }),
    //   Input({
    //     type: "text",
    //     label: "Nome",
    //     placeholder: "Digite seu nome",
    //     name: "name",
    //   }),
    //   Input({
    //     type: "password",
    //     label: "Senha",
    //     placeholder: "Digite sua senha",
    //     name: "password",
    //   }),
    //   Input({
    //     type: "email",
    //     label: "Email",
    //     placeholder: "Digite seu email",
    //     name: "email",
    //   }),
    //   Select({
    //     id: "select",
    //     name: "select",
    //     required: true,
    //     options: [
    //       { value: "none", label: "Não possui professor" },
    //       { value: "1", label: "Opção 1" },
    //       { value: "2", label: "Opção 2" },
    //       { value: "3", label: "Opção 3" },
    //     ],
    //     value: "",
    //     placeholder: "Selecione uma opção",
    //   }),
    // ],
  });
  body.appendChild(boxTestMain);
});
