function SidebarItem({ iconSrc, text, link, selected = false }) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');
  const p = document.createElement('p');

  a.href = link;
  a.classList.add('menu-item');
  img.src = iconSrc;
  p.textContent = text;

  if (selected) {
    a.classList.add('selected');
  }

  a.appendChild(img);
  a.appendChild(p);
  li.appendChild(a);

  return li;
}

export function Sidebar({ itens = [] }) {
  const nav = document.createElement('nav');

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
  const divFooter = document.createElement('div');
  divFooter.classList.add('nav-footer');

  const logout = SidebarItem({ iconSrc: '../assets/psswd.svg', text: 'Alterar senha', link: '/change-password' });
  const changePassword = SidebarItem({ iconSrc: '../assets/logout.svg', text: 'Encerrar sessão', link: '/logout' });

  divFooter.appendChild(logout);
  divFooter.appendChild(changePassword);

  nav.appendChild(aHeader);
  nav.appendChild(ul);
  nav.appendChild(divFooter);

  return nav;
}
