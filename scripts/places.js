async function searchData(){
    let res = await fetch("https://636a539ec07d8f936d9a5d5e.mockapi.io/awadhStore/roamAroundBlogs",{
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    let data = await res.json();
    display(data)
}

searchData()

let mainsection = document.querySelector(".city-content");

function display(data,value){
    mainsection.innerHTML = "";

   if(data !== []){
    let newData = data.map((item) => {
        let desc = item.desc;
    return ` 
    <div class="places">
    <img src=${item.image} alt="">
    <div class="place-content">
        <h2>${item.title}</h2>
        <p> Like : ♥ ${item.like}</p>
        <p>Location : ${item.location}</p>
        <br> 
        <p>${desc.substring(0,150)}...</p>
    </div>
</div>`
    })
    mainsection.innerHTML = newData.join(" ") 
   } else{
    mainsection.innerHTML =`<div class="hotels"> No Item Found </div>`
   }
}