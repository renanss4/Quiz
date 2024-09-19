import { Dialog } from "../Dialog/Dialog.js";

function SidebarItem({
  iconSrc,
  text,
  link = null,
  action = () => {},
  selected = false,
}) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const img = document.createElement("img");
  const p = document.createElement("p");

  a.classList.add("menu-item");
  if (selected) {
    a.classList.add("selected"); // Adiciona uma classe para o item selecionado
  }

  img.src = iconSrc;
  p.textContent = text;

  a.appendChild(img);
  a.appendChild(p);
  li.appendChild(a);

  // Prioriza o link se existir
  if (link) {
    a.href = link;
  } else if (action) {
    a.addEventListener("click", (e) => {
      e.preventDefault(); // Previne o redirecionamento padrão do link
      action();
    });
  }

  return li;
}

function showDialog() {
  const overlay = document.getElementById("overlay");
  const dialogContainer = document.getElementById("dialog-container");

  const dialog = Dialog({
    title: "Tem certeza?",
    message:
      "Você irá encerrar a sessão e será redirecionado para a página de login.",
    buttons: [
      {
        type: "outline",
        size: "mid",
        text: "Cancelar",
        onClick: () => {
          hideDialog();
        },
      },
      {
        type: "destructive",
        size: "mid",
        text: "Encerrar",
        onClick: () => {
          localStorage.removeItem("token"); // Remove o token do localStorage
          window.location.href = "../login.html";
        },
      },
    ],
  });

  dialogContainer.innerHTML = ""; // Limpa o conteúdo anterior
  dialogContainer.appendChild(dialog);
  overlay.style.display = "block"; // Exibe o overlay
  dialogContainer.style.display = "block"; // Exibe o dialog
}

function hideDialog() {
  const overlay = document.getElementById("overlay");
  const dialogContainer = document.getElementById("dialog-container");

  overlay.style.display = "none"; // Esconde o overlay
  dialogContainer.style.display = "none"; // Esconde o dialog
}

export function Sidebar({ itens = [] }) {
  const nav = document.createElement("nav");
  nav.classList.add("sidebar");

  // header
  const aHeader = document.createElement("a");
  aHeader.classList.add("nav-header");
  const divHeader = document.createElement("div");
  const imgHeader = document.createElement("img");

  // const userType = "student";
  // switch (userType) {
  //   case "student":
  //     aHeader.href = "../student/student-dashboard.html";
  //     break;
  //   case "teacher":
  //     aHeader.href = "../teacher/teacher-dashboard.html";
  //     break;
  //   case "admin":
  //     aHeader.href = "../admin/admin-dashboard.html";
  //     break;
  //   default:
  //     aHeader.href = "../login.html ";
  //     break;
  // }
  aHeader.href = "../../index.html";
  divHeader.className = "logo";
  imgHeader.src = "../../assets/logo1.svg";
  divHeader.appendChild(imgHeader);
  aHeader.appendChild(divHeader);

  // menu
  const ul = document.createElement("ul");
  ul.className = "menu";

  itens.forEach((item) => {
    const isSelected =
      item.link &&
      window.location.pathname ===
        new URL(item.link, window.location.origin).pathname;
    ul.appendChild(SidebarItem({ ...item, selected: isSelected }));
  });

  // footer
  const ulFooter = document.createElement("ul");
  ulFooter.classList.add("nav-footer");

  const logout = SidebarItem({
    iconSrc: "../../assets/logout.svg",
    text: "Encerrar sessão",
    action: showDialog,
  });
  logout.style.cursor = "pointer";

  const changePassword = SidebarItem({
    iconSrc: "../../assets/psswd.svg",
    text: "Alterar senha",
    link: "/change-password",
  });

  ulFooter.appendChild(changePassword);
  ulFooter.appendChild(logout);

  nav.appendChild(aHeader);
  nav.appendChild(ul);
  nav.appendChild(ulFooter);

  return nav;
}
