async function searchData() {
    let res = await fetch("https://636a539ec07d8f936d9a5d5e.mockapi.io/awadhStore/roamAround", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    let data = await res.json();
    CitySearch(data)
}

document.querySelector("#city-search").addEventListener("click", () => {
    searchData();
})

function CitySearch(data) {
    let value = document.querySelector("#city").value

    let new_data = data.filter((ele) => {
        return ele.location.toLowerCase() === value.toLowerCase();
    })
    display(new_data, value)
}

let mainsection = document.querySelector(".city-content");

function display(data, value) {
    mainsection.innerHTML = "";

    if (data != []) {
        let newData = data.map((item) => {
            let desc = item.desc;
            return ` 
    <div class="hotels" data-id=${item.id}>
    <img  src=${item.image} alt="" data-id=${item.id}>
    <div class="hotel-content" data-id=${item.id}>
        <h2 data-id=${item.id}>${item.title}</h2>
        <p data-id=${item.id}> Rating : ${item.rating}</p>
        <p data-id=${item.id}> Price : ₹ ${item.price}</p>
        <p data-id=${item.id}>Location : ${item.location}</p>
        <br> 
        <p data-id=${item.id}>${desc.substring(0, 150)}...</p>
    </div>
</div>`
        })
        mainsection.innerHTML = ` 
    <h1>Hotels Matching "${value}"</h1>

    <br>
    ${newData.join(" ")} `
    } else {
        mainsection.innerHTML = `<div class="hotels"> No Item Found </div>`
    }

    let hotelsData = document.querySelectorAll(".hotels");

    for(let hotel of hotelsData){
        hotel.addEventListener("click", event => {
            let id = event.target.dataset.id
            localStorage.removeItem("city-id")
            localStorage.setItem("city-id",id)
            window.location.href = "booking.html"
        })
    }

}