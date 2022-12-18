import { navbar, sectionBody, footer } from './navbar.js';

document.querySelector('#navbar').innerHTML = navbar();
document.querySelector('#body').innerHTML = sectionBody();
document.querySelector('#footer').innerHTML = footer();