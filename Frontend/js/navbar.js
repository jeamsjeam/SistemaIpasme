
const navbar = document.createElement('nav');
navbar.className = 'navbar navbar-expand-lg navbar-dark bg-primary bg-gradient';
navbar.id = 'headerNav';

const container = document.createElement('div');
container.className = 'container-fluid';

const brandLink = document.createElement('a');
brandLink.className = 'navbar-brand d-block d-lg-none';
brandLink.href = '#';

const brandImg = document.createElement('img');
brandImg.src = 'css/imagenes/ipaslogo.png';
brandImg.height = '45';
brandImg.style.filter = 'brightness(6)';
brandLink.appendChild(brandImg);

const togglerButton = document.createElement('button');
togglerButton.className = 'navbar-toggler';
togglerButton.type = 'button';
togglerButton.setAttribute('data-bs-toggle', 'collapse');
togglerButton.setAttribute('data-bs-target', '#navbarNavDropdown');
togglerButton.setAttribute('aria-controls', 'navbarNavDropdown');
togglerButton.setAttribute('aria-expanded', 'false');
togglerButton.setAttribute('aria-label', 'Toggle navigation');

const togglerIcon = document.createElement('span');
togglerIcon.className = 'navbar-toggler-icon';
togglerButton.appendChild(togglerIcon);

const collapseDiv = document.createElement('div');
collapseDiv.className = 'collapse navbar-collapse';
collapseDiv.id = 'navbarNavDropdown';

const ulList = document.createElement('ul');
ulList.className = 'navbar-nav mx-auto';
ulList.style.alignItems = 'center';

const homeItem = document.createElement('li');
homeItem.className = 'nav-item';

const homeLink = document.createElement('a');
homeLink.className = 'nav-link mx-2 active';
homeLink.setAttribute('aria-current', 'page');
homeLink.href = 'index.html';
homeLink.textContent = 'Home';
homeItem.appendChild(homeLink);

const asistencialItem = document.createElement('li');
asistencialItem.className = 'nav-item';

const asistencialLink = document.createElement('a');
asistencialLink.className = 'nav-link mx-2';
asistencialLink.href = 'asistencial.html';
asistencialLink.textContent = 'Reposos';
asistencialItem.appendChild(asistencialLink);

const logoItem = document.createElement('li');
logoItem.className = 'nav-item d-none d-lg-block';

const logoLink = document.createElement('a');
logoLink.className = 'nav-link mx-2';

const logoImg = document.createElement('img');
logoImg.src = 'css/imagenes/ipaslogo.png';
logoImg.height = '45';
logoImg.style.filter = 'brightness(6)';
logoLink.appendChild(logoImg);
logoItem.appendChild(logoLink);

const rrhhItem = document.createElement('li');
rrhhItem.className = 'nav-item';

const rrhhLink = document.createElement('a');
rrhhLink.className = 'nav-link mx-2';
rrhhLink.href = 'recursoshumanos.html';
rrhhLink.textContent = 'RR. HH.';
rrhhItem.appendChild(rrhhLink);

const citasItem = document.createElement('li');
citasItem.className = 'nav-item';

const citasLink = document.createElement('a');
citasLink.className = 'nav-link mx-2';
citasLink.href = '#';
citasLink.textContent = 'Citas';
citasItem.appendChild(citasLink);

// const companyItem = document.createElement('li');
// companyItem.className = 'nav-item dropdown';

// const companyLink = document.createElement('a');
// companyLink.className = 'nav-link mx-2 dropdown-toggle';
// companyLink.href = '#';
// companyLink.id = 'navbarDropdownMenuLink';
// companyLink.setAttribute('data-bs-toggle', 'dropdown');
// companyLink.setAttribute('aria-expanded', 'false');
// companyLink.textContent = 'Company';
// companyItem.appendChild(companyLink);

// const dropdownMenu = document.createElement('ul');
// dropdownMenu.className = 'dropdown-menu';
// dropdownMenu.setAttribute('aria-labelledby', 'navbarDropdownMenuLink');

// const blogItem = document.createElement('li');
// const blogLink = document.createElement('a');
// blogLink.className = 'dropdown-item';
// blogLink.href = '#';
// blogLink.textContent = 'Blog';
// blogItem.appendChild(blogLink);

// const aboutUsItem = document.createElement('li');
// const aboutUsLink = document.createElement('a');
// aboutUsLink.className = 'dropdown-item';
// aboutUsLink.href = '#';
// aboutUsLink.textContent = 'About Us';
// aboutUsItem.appendChild(aboutUsLink);

// const contactUsItem = document.createElement('li');
// const contactUsLink = document.createElement('a');
// contactUsLink.className = 'dropdown-item';
// contactUsLink.href = '#';
// contactUsLink.textContent = 'Contact us';
// contactUsItem.appendChild(contactUsLink);

// dropdownMenu.appendChild(blogItem);
// dropdownMenu.appendChild(aboutUsItem);
// dropdownMenu.appendChild(contactUsItem);

// companyItem.appendChild(dropdownMenu);

ulList.appendChild(homeItem);
ulList.appendChild(asistencialItem);
ulList.appendChild(logoItem);
ulList.appendChild(rrhhItem);
ulList.appendChild(citasItem);

collapseDiv.appendChild(ulList);

container.appendChild(brandLink);
container.appendChild(togglerButton);
container.appendChild(collapseDiv);

navbar.appendChild(container);

const targetElement = document.getElementById('navbarContainer');
targetElement.appendChild(navbar);