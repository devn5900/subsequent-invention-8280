import { navbar, sectionBody, footer } from './navbar.js';


document.querySelector('#navbar').innerHTML = navbar();
document.querySelector('#body').innerHTML = sectionBody();
document.querySelector('#footer').innerHTML = footer();

/////////////////////////////////////////////////
document.querySelector('#city-search').addEventListener('click', () => {
    let city = document.querySelector('#city').value;
    if (city == "") {

    } else {
        localStorage.setItem('Search', city);
        window.location.href = './hotel.html';
    }
})