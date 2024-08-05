function SidebarItem({ iconSrc, text, link }) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');
  const p = document.createElement('p');

  a.href = link;
  a.classList.add('menu-item');
  img.src = iconSrc;
  p.textContent = text;

  a.appendChild(img);
  a.appendChild(p);
  li.appendChild(a);

  return li;
}

export function Sidebar({ itens = [] }) {
  const nav = document.createElement('nav');
  nav.classList.add('sidebar');

  // header
  const aHeader = document.createElement('a');
  aHeader.classList.add('nav-header');
  const divHeader = document.createElement('div');
  const imgHeader = document.createElement('img');

  aHeader.href = '/';
  divHeader.className = 'logo';
  imgHeader.src = '../assets/logo1.svg';
  divHeader.appendChild(imgHeader);
  aHeader.appendChild(divHeader);

  // menu
  const ul = document.createElement('ul');
  ul.className = 'menu';

  itens.forEach(item => {
    const isSelected = window.location.pathname === new URL(item.link, window.location.origin).pathname;
    ul.appendChild(SidebarItem({ ...item, selected: isSelected }));
  });

  // footer
  const ulFooter = document.createElement('ul');
  ulFooter.classList.add('nav-footer');

  const logout = SidebarItem({ iconSrc: '../assets/logout.svg', text: 'Encerrar sessão', link: '/logout' });
  const changePassword = SidebarItem({ iconSrc: '../assets/psswd.svg', text: 'Alterar senha', link: '/change-password' });

  ulFooter.appendChild(changePassword);
  ulFooter.appendChild(logout);

  nav.appendChild(aHeader);
  nav.appendChild(ul);
  nav.appendChild(ulFooter);

  return nav;
}
