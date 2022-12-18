import { navbar, sectionBody, footer } from './navbar.js';

document.querySelector('#navbar').innerHTML = navbar();
document.querySelector('#body').innerHTML = sectionBody();
document.querySelector('#footer').innerHTML = footer();
paymentDone();

function paymentDone() {
    setTimeout(() => {
        let paymentdiv = document.querySelector(".payment");
        paymentdiv.innerHTML = "";
        paymentdiv.innerHTML = `<img src = "https://media0.giphy.com/media/TDyxBGZcViZnoye8iN/200w.webp?cid=ecf05e4771m039u4euvjbkq0be1p8wromk2qnmt0lvz5pq6x&rid=200w.webp&ct=g"
            alt = "" >
                <h1>Ticket Booked</h1>`;

        let data = JSON.parse(localStorage.getItem("temp-details"))
        let detailsdiv = document.querySelector(".done")
        detailsdiv.innerHTML = "";
        detailsdiv.innerHTML = `
            <div>
                <h4>Transction id : ${Math.floor((Math.random() * 1000000000000) + 1)}</h4>
    <img src="https://th.bing.com/th/id/OIP.yStt_6omWgPJ1kriUtoJFwHaHa?w=204&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
    <h1>${data.name}</h1> <br>
    <span> Check-In : ${data.checkin}  </span> <br> <span>Check-Out : ${data.checkout}</span> <br> <br>
    <img src="https://th.bing.com/th/id/OIP.d6DUGG3d1gOCWQtuhK09LgHaHa?w=199&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
    <p>Room : ${data.room}</p> <br>
    <img src="https://th.bing.com/th/id/OIP.yStt_6omWgPJ1kriUtoJFwHaHa?w=204&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
    <p>Adult : ${data.adult}</p> <br>
    <img src="https://th.bing.com/th/id/OIP.31-3KHOOcNgWd_fSqUD8DQHaHa?w=213&h=204&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
    <p>Child : ${data.child}</p> <br>
    <img src="https://th.bing.com/th/id/OIP.upRS56nxpam3BujmD_DD_wHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
    <p> Price : ₹ ${data.price} </p> <br>
  </div>
            `

    }, 5000)
}