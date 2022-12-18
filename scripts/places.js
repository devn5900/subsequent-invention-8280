

let hotelUrl = "https://636a539ec07d8f936d9a5d5e.mockapi.io/awadhStore/roamAroundBlogs";
let mainsection = document.querySelector(".city-content");
async function searchData() {
    mainsection.innerHTML = '';
    preloader();
    let res = await fetch(hotelUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    let data = await res.json();
    display(data)
}

searchData()


function display(data, value) {
    mainsection.innerHTML = "";

    if (data !== []) {
        let newData = data.map((item) => {
            let desc = item.desc;
            return ` 
    <div class="places" data-id=${item.id} >
        <img src=${item.image} data-id=${item.id} alt="">
        <div data-id=${item.id} class="place-content">
            <h2 data-id=${item.id}>${item.title}</h2>
            <p data-id=${item.id}> Like : ♥ ${item.like}</p>
            <p data-id=${item.id}>Location : ${item.location}</p>
            <br> 
            <p data-id=${item.id}>${desc.substring(0, 150)}...</p>
        </div>
    </div>`
        })
        mainsection.innerHTML = newData.join(" ")
    } else {
        mainsection.innerHTML = `<div class="hotels"> No Item Found </div>`
    }
}

function preloader() {
    mainsection.innerHTML = `<div id="preloader">
  <div id="loader"></div>
</div>`;
}