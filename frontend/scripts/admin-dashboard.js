/**
 * Admin Dashboard
 * 
 * 1- importar os modulos necessários
 * 2- pegar os elementos do DOM
 * 
 * 3- Adicionar um evento de click no botão de subject
 * quando o usuario clicar no botão de subject, ele
 * deve ser redirecionado para a página de subject
 * 
 * 4- na página de subject, o usuário, neste caso
 * o admin deve ser capaz de adicionar um novo subject
 */

// 1
// import { fetchAdmin } from './configs/fetch.js'

// 2
const buttonSubject = document.querySelector('#subject')

// 3
buttonSubject.addEventListener('click', () => {
  window.location.href = 'subject.html'
})

// 4
