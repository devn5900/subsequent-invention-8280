async function searchData(){
    let res = await fetch("https://636a539ec07d8f936d9a5d5e.mockapi.io/awadhStore/roamAround",{
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    let data = await res.json();
    CitySearch(data)
}

document.querySelector("#city-search").addEventListener("click", () => {
    searchData();
})

function CitySearch(data){
    let value = document.querySelector("#city").value
    
    localStorage.removeItem("city");
    localStorage.setItem("city",value);
    
    let new_data =  data.filter((ele) => {
        return ele.location === value;
    })
    display(new_data,value)
}

let mainsection = document.querySelector(".city-content");

function display(data,value){
    mainsection.innerHTML = "";

   if(data != []){
    let newData = data.map((item) => {
        let desc = item.desc;
    return ` 
    <div class="hotels">
    <img src=${item.image} alt="">
    <div class="hotel-content">
        <h2>${item.title}</h2>
        <p> Rating : ${item.rating}</p>
        <p> Price : ₹ ${item.price}</p>
        <p>Location : ${item.location}</p>
        <br> 
        <p>${desc.substring(0,150)}...</p>
    </div>
</div>`
    })
    mainsection.innerHTML = ` 
    <h1>Hotels Matching "${value}"</h1>

    ${newData.join(" ")} `
   } else{
    mainsection.innerHTML =`<div class="hotels"> No Item Found </div>`
   }


}