
import { navbar, sectionBody, footer } from './navbar.js';

document.querySelector('#navbar').innerHTML = navbar();
document.querySelector('#body').innerHTML = sectionBody();
document.querySelector('#footer').innerHTML = footer();

let bookData = JSON.parse(localStorage.getItem("temp-details"));

showData(bookData)

function showData(data) {
    let maindiv = document.querySelector(".booking-data")

    maindiv.innerHTML = ""

    maindiv.innerHTML = `<div>
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
  </div>`
}

document.querySelector("#card").addEventListener("click", () => {
    let paydiv = document.querySelector(".method-details")

    paydiv.innerHTML = `<div class="details-form">
                <label for="">Card Number</label>
                <input type="Number" id="cardnumber" placeholder="Enter Card Number"> <br> <hr>
                <label for="">Month</label>
                <select id="month"> 
                    <option value="jan">January</option>
                    <option value="">February</option>
                    <option value="">March</option>
                    <option value="">April</option>
                    <option value="">May</option>
                    <option value="">June</option>
                    <option value="">July</option>
                    <option value="">August</option>
                    <option value="">September</option>
                    <option value="">October</option>
                    <option value="">November</option>
                    <option value="">December</option>
                </select>
                <label for="">Year</label>
                <select id="year"> 
                    <option value="jan">2023</option>
                    <option value="">2024</option>
                    <option value="">2025</option>
                    <option value="">2026</option>
                    <option value="">2027</option>
                    <option value="">2028</option>
                </select> <br> <hr>
                <label for="">CVV</label>
                <input type="number" id="cvv" placeholder="Enter CVV"> <br> <hr>
                <button onclick="cardbuttonClick()"> Book</button>
            </div>`
})

document.querySelector("#upi").addEventListener("click", () => {
    let paydiv = document.querySelector(".method-details");

    paydiv.innerHTML = `<div class="details-form">
    <label for="">UPI Id</label>
    <input type="Number" id="upinumber" placeholder="Enter UPI Id"> <br> <hr>
    <button onclick="upibuttonClick()">Book</button>`
})

function upibuttonClick() {
    let upi = document.querySelector("#upinumber").value;
    if (upi.length === 10) {
        otp = parseInt(1000 + Math.random() * 9000);
        alert("Your otp is : " + otp)
    }
    else {
        alert("Enter Correct UPI Id")
    }
}

function cardbuttonClick() {
    let card = document.querySelector("#cardnumber").value;
    let cvv = document.querySelector("#cvv").value
    if (card.length === 12 && cvv.length == 3) {
        otp = parseInt(1000 + Math.random() * 9000);
        alert("Your otp is : " + otp)

    }
    else {
        alert("Enter Correct Card Details")
    }
}

function OtpCheck() {
    let enteredotp = document.querySelector("#enteredotp")
    if (enteredotp.value == otp) {
        window.location.href = "payment.html"
    }
    else {
        alert("Wrong Otp")
    }
}