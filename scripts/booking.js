let id = localStorage.getItem("city-id");
let bookingData = localStorage.getItem("Booking-Details") || [];

let hotelUrl = "https://636a539ec07d8f936d9a5d5e.mockapi.io/awadhStore/roamAround"

async function hotelBook(id,event){
    let res = await fetch(`${hotelUrl}/${id}`,{
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    })

    let data = await res.json();

    Display(data)
}

hotelBook(id)

function Display(data){
    let headDiv = document.querySelector(".heading");

    headDiv.innerHTML = "";

    headDiv.innerHTML =  ` <h1> ${data.title}</h1>
    <div class="info">
        <div>
            <img src="https://th.bing.com/th/id/OIP.wBM_JBD7Kwx5cqCW77J_gQHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="">
            <a href="#">${data.location}</a>
        </div>
        <div>
            <img src="https://th.bing.com/th/id/OIP.y3eF2FkOVYXVVGarLPb7FQHaHa?w=198&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="">
            <a href="#">${data.phone}</a>
        </div>
        <div>
            <img src="https://th.bing.com/th/id/OIP.JFr9QZ7D0XZUBQzYw0GpLwHaHa?w=186&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="">
            <a href="#">Hotel-Website</a>
        </div>
        <div>
            <img src="https://th.bing.com/th/id/OIP.8pRjvmtzdUnun_IaHTJZ_QHaFG?w=292&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="">
            <a href="#">E-mail</a>
        </div>
    </div>`;


    let imagediv = document.querySelector(".hotel-image");

    imagediv.innerHTML = ""

    imagediv.innerHTML = `<img src=${data.image} alt=""></img>`; 

    let price = document.querySelector(".price");

    price.innerHTML = ` <p> Price : ₹ <span class="hotel-price">${data.price}</span> </p>`
    
    let aboutDesc = document.querySelector(".desc");

    aboutDesc.innerHTML = `<h1>Rating : ${data.rating}</h1> <span><b> ${data.rating >5 ? "Excellent" : "Good"}</b></span>
    <div>
        <img src="https://th.bing.com/th/id/OIP.QpRG5HMDuyWbKZf3FxWjzQHaBX?w=318&h=64&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="">
        <span>Location</span> <br>
        <img src="https://th.bing.com/th/id/OIP.QpRG5HMDuyWbKZf3FxWjzQHaBX?w=318&h=64&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="">
        <span>Cleanliness</span> <br>
        <img src="https://th.bing.com/th/id/OIP.QpRG5HMDuyWbKZf3FxWjzQHaBX?w=318&h=64&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="">
        <span>Service</span> <br>
        <img src="https://th.bing.com/th/id/OIP.QpRG5HMDuyWbKZf3FxWjzQHaBX?w=318&h=64&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="">
        <span>Value</span> <br>
    </div>
    <p>${data.desc}</p>
    <br>
    <hr> 
    <p>Suggest edits to improve what we show.</p>
    <a href="#">Improve the listing</a>`
}

document.querySelector("#room-sub").addEventListener("click",() => {
        let value = document.querySelector("#room").innerText;
        if(value!=1){
            value--;
        }
        else{
            value=1;
        }

        document.querySelector("#room").innerText = value
})

document.querySelector("#room-add").addEventListener("click",() => {
    let value = document.querySelector("#room").innerText;
        value++
    document.querySelector("#room").innerText = value
})

document.querySelector("#adult-sub").addEventListener("click",() => {
        let value = document.querySelector("#adult").innerText;
        if(value!=1){
            value--;
        }
        else{
            value=1;
        }

        document.querySelector("#adult").innerText = value
})

document.querySelector("#adult-add").addEventListener("click",() => {
    let value = document.querySelector("#adult").innerText;
        value++
    document.querySelector("#adult").innerText = value
})

document.querySelector("#child-sub").addEventListener("click",() => {
    let value = document.querySelector("#child").innerText;
    if(value!=0){
        value--;
    }
    else{
        value=0;
    }

    document.querySelector("#child").innerText = value
})

document.querySelector("#child-add").addEventListener("click",() => {
let value = document.querySelector("#child").innerText;
    value++
document.querySelector("#child").innerText = value
})

document.querySelector(".book").addEventListener("click", function(){
    bookHotel();
})

function bookHotel(){
    let name = document.querySelector("#name").value;
    let checkin = document.querySelector("#checkin-date").value;
    let checkout = document.querySelector("#checkout-date").value;
    let room = document.querySelector("#room").innerText;
    let adult = document.querySelector("#adult").innerText;
    let child = document.querySelector("#child").innerText;
    let price = document.querySelector(".hotel-price").innerText * room;
    
   let bookingDetails = {
    name,
    checkin,
    checkout,
    room,
    adult,
    child,
    price,
   }

   bookingData.push(bookingDetails);

   localStorage.setItem("Booking-Details",JSON.stringify(bookingData))
}