let hotel = 'https://636a539ec07d8f936d9a5d5e.mockapi.io/awadhStore/roamAround';
let blogs = 'https://636a539ec07d8f936d9a5d5e.mockapi.io/awadhStore/roamAroundBlogs';
////////////////////////////////////////////////////////////////////////////////////
let container = document.getElementById('adminFunc')
document.getElementById('dash').addEventListener('click', (e) => {
    e.preventDefault();
    preloader();
    getDash();

})
getDash();
async function getDash() {
    let res = await Promise.all([fetch(hotel),
    fetch(blogs)]
    );
    let data = await res[0].json();
    let data1 = await res[1].json();
    container.innerHTML = '';
    container.innerHTML = `<div class="info">
                <h1>Hotels</h1>
                <h3>${data.length}</h3>
            </div>
            <div class="info">
                <h1>Blogs</h1>
                <h3>${data1.length}</h3>
            </div>`;

}


////////////////////////////////////////////////////////////////////////////////////
document.getElementById('adhot').addEventListener('click', (e) => {
    e.preventDefault();
    preloader();
    setTimeout(() => {
        container.innerHTML = '';
        container.innerHTML = newHotel();
    }, 1000);

})

function newHotel() {
    return `   <div class="add">
                <h2 class='headTag'>Add New Hotels</h2>
                <form id="addHtl" class="addHtl">
                    <input type="text" id="title" placeholder="Hotel Name"><br>
                    <input type="text" id="desc" placeholder="About to Hotels"><br>
                    <input type="text" id="image" placeholder="Image"><br>
                    <input type="number" id="phone" placeholder="Phone Number"><br>
                    <input type="number" id="price" placeholder="Price"><br>
                    <input type="text" id="location" placeholder="Location"><br>
                    <input type="submit" value="ADD HOTEL">
                </form>
            </div>`;
}
/////////////////////////////////////////////////////////////////////////////////
document.getElementById('shoHot').addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = '';
    preloader();
    fetchHotel();
})

async function fetchHotel() {
    try {
        let res = await fetch(hotel);
        if (res.ok) {
            let data = await res.json();
            appenHotel(data);
        } else {
            console.log('Error');
        }
    } catch (error) {
        console.log(error);
    }
}
function appenHotel(data) {
    let mapped = mapData(data);
    container.innerHTML = `  <div class="hotelsdiv">
                                <h2 class='headTag'>All Hotels</h2>
                                <input type="text" id="searchHotel" placeholder="Search By Hotel, Tag, Location...." />
                                  <div id='hoItem'>  ${mapped.join('')}
                               </div>
                            </div>`;
    document.getElementById('searchHotel').addEventListener('input', (e) => {
        e.preventDefault();
        let searHotl = document.getElementById('searchHotel').value;
        let sear = data.reduce((acc, el) => {
            if (el.location.toLowerCase().includes(searHotl.toLowerCase()) || el.title.toLowerCase().includes(searHotl.toLowerCase()) || el.desc.toLowerCase().includes(searHotl.toLowerCase())) {
                acc.push(el);
            }
            return acc;
        }, []);
        let mapd = mapData(sear);
        if (mapd.length) {
            document.getElementById('hoItem').innerHTML = '';
            document.getElementById('hoItem').innerHTML = `${mapd.join('')}`;
        } else {
            document.getElementById('hoItem').innerHTML = '';
            document.getElementById('hoItem').innerHTML =
                `<div class="items"><div class="item">
                            <div>
                                <span class='headTag'>Not Found...............</span>
                                <span></span>
                            </div>
                    </div>`;
        }
        let edB = document.querySelectorAll('.editBlog');
        edB.forEach((el) => {
            el.addEventListener('click', (e) => {
                console.log(e.target.dataset.id);
                editHotel(e.target.dataset.id);
            });
        });
        let delB = document.querySelectorAll('.deleteBlog');
        delB.forEach((el) => {
            el.addEventListener('click', (e) => {
                if (confirm('Do you want to delete....?')) {
                    deleteHotel(e.target.dataset.id);
                }
            });
        })
    });
    let edB = document.querySelectorAll('.editBlog');
    edB.forEach((el) => {
        el.addEventListener('click', (e) => {
            console.log(e.target.dataset.id);
            editHotel(e.target.dataset.id);
        });
    })
    let delB = document.querySelectorAll('.deleteBlog');
    delB.forEach((el) => {
        el.addEventListener('click', (e) => {
            if (confirm('Do you want to delete....?')) {
                deleteHotel(e.target.dataset.id);
            }
        });
    })
}

async function deleteHotel(id) {
    let res = await fetch(`${hotel}/${id}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        let data = await res.json();
        alert('Deleted Successfuly !', 'red', 'tomato', '#f1af90');
        console.log(data);
        container.innerHTML = '';
        preloader();
        fetchHotel();
    } else {
        console.log('Deleting Error');
    }
}

async function editHotel(id) {
    container.innerHTML = '';
    preloader();
    // fetchHotel();
    let res = await fetch(`${hotel}/${id}`);
    if (res.ok) {
        let data = await res.json();
        console.log(data);
        let ed = editIndiHotel(data);
        container.innerHTML = ed;
    } else {
        console.log('Error');
    }
    document.querySelector('#editIndHotel').addEventListener('submit', (e) => {
        e.preventDefault();
        let editform = document.querySelectorAll('#editIndHotel input');
        console.log(editform);
        let obj = {};
        let id;
        for (let i = 0; i < editform.length; i++) {
            if (editform[i].value == "" || editform[i].value == null) {
                editform[i].style.border = '1px solid red';
                return;
            } else {
                if (editform[i].id != 'submit') {
                    if (editform[i].id == 'id') {
                        id = editform[i].value;
                    } else {
                        obj[editform[i].id] = editform[i].value;
                    }
                }
            }
        }
        let des = document.querySelector('#editIndHotel #desc').value;
        obj['desc'] = des;
        updateHotel(obj, id);
    })
    document.getElementById('closeeditHotel').addEventListener('click', (e) => {
        e.preventDefault();
        container.innerHTML = '';
        preloader();
        fetchHotel();
    });
}
async function updateHotel(obj, id) {
    let res = await fetch(`${hotel}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    if (res.ok) {
        let data = await res.json();
        console.log(data);
        alert('Updated Successfuly !', '#467A56', '#467A56', '#95D59D');
        setTimeout(() => {
            container.innerHTML = '';
            preloader();
            fetchHotel();
        }, 2000);
    } else {
        console.log('Not Updated');
    }
}
function editIndiHotel({ title, desc, image, price, rating, checkin, checkout, phone, id, location }) {
    return `   <div class="add">
            <button id='closeeditHotel'>Back</button>
                <h2 class='headTag'>Edit Hotel Details</h2>
                <form id="editIndHotel" class="addHtl">
                    <input type="text"   value="${title}" id="title" placeholder="Hotel Name"><br>
                    <textarea id="desc" placeholder="Blog Content" cols="25" rows="5">${desc}</textarea>
                    <br>
                    <input type="text"   value=${image} id="image" placeholder="Image"><br>
                    <input type="time"   value=${checkin} id="checkin" placeholder="CheckIn"><br>
                    <input type="time"   value=${checkout} id="checkout" placeholder="CheckOut"><br>
                    <input type="text" value="${phone}" id="phone" placeholder="Phone Number"><br>
                    <input type="text" value="${price}" id="price" placeholder="Price"><br>
                    <input type="text"   value=${location} id="location" placeholder="Location"><br>
                    <input type="hidden"   value=${id} id="id" /><br>
                    <input type="submit" id="submit" value="UPDATE HOTEL">
                </form>
            </div>`;
}
function mapData(data) {
    let mapped = data.map((el) => {
        return showHotel(el);
    });

    return mapped;
}
function showHotel({ title, desc, image, price, rating, checkin, checkout, phone, id, location }) {
    return `<div class="items"><div class="item">
                        <div><img src=${image} alt=""></div>
                        <div>
                            <div>
                                <span>${title}</span>
                                (<span>${location}</span>)
                            </div>
                            <div>
                                <span>$${price}</span>
                                <span>
                                    <span>CheckIn</span>
                                    <span>${checkin}</span>
                                </span>
                                <span>
                                    <span>CheckOut</span>
                                    <span>${checkout}</span>
                                </span>
                                <span>${phone}</span>
                                <span>${rating}</span>
                            </div>
                            <p>${desc.substring(0, 255)}</p>
                        </div>
                        <div class="blogbtn">
                            <button data-id=${id} class="editBlog">Edit</button>
                            <button data-id=${id} class="deleteBlog">Delete</button>
                        </div> </div>
                    </div>`;


}
//////////////////////////////////////////////////////////////////////
document.getElementById('wriBlo').addEventListener('click', (e) => {
    e.preventDefault();
    preloader();
    setTimeout(() => {
        container.innerHTML = '';
        container.innerHTML = writeBlog();
    }, 1000);

})
function writeBlog() {
    return ` <div class="add">
                <h2 class='headTag'>Write Blogs</h2>
                <form id="writeBlog" class="addHtl">
                    <input type="text" id="title" placeholder="Blog Title"><br>
                    <textarea id="desc" placeholder="Blog Content" cols="25" rows="5"></textarea>
                    <br>
                    <input type="text" id="image" placeholder="Image"><br>
                    <input type="text" id="price" placeholder="Writer"><br>
                    <input type="text" id="location" placeholder="Location"><br>
                    <input type="submit" value="POST BLOG">
                </form>
            </div>`;

}
/////////////////////////////////////////////////////////////////////////////////
document.getElementById('shoBlo').addEventListener('click', (e) => {
    e.preventDefault();
    preloader();
    setTimeout(() => {
        container.innerHTML = '';
        container.innerHTML = showBlogs();
    }, 1000);
})
function showBlogs() {
    return `  <div class="hotelsdiv">
                <h2 class='headTag'>All Blogs</h2>
                <div class="items">
                    <div class="item">
                        <div><img src="../images/reloder.png" alt=""></div>
                        <div>
                            <div>
                                <span>title</span>
                                (<span>Andaman & Nikobar</span>)
                            </div>
                            <div>
                                <span>admin</span>
                                <span>9:26:19 PM</span>
                            </div>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore dignissimos nostrum
                                debitis ipsam ullam excepturi perspiciatis. Soluta numquam a, neque aut laboriosam,
                                debitis aliquid molestias ipsam natus optio deleniti similique suscipit, officia ratione
                                saepe iusto.</p>
                        </div>
                        <div class="blogbtn">
                            <button data-id="" id="editBlog">Edit</button><button data-id=""
                                id="deleteBlog">Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
}


function preloader() {
    container.innerHTML = `<div id="preloader">
  <div id="loader"></div>
</div>`;
}

function alert(msg, color, border, bg) {
    document.getElementById('alert').style.right = '150px';
    document.getElementById('alert').style.backgroundColor = bg;
    document.getElementById('alert').style.color = color;
    document.getElementById('alert').style.border = `1px solid ${border}`;
    setTimeout(() => {

        document.getElementById('alert').style.right = '-100px';
    }, 1500);
    setTimeout(() => {
        document.getElementById('alert').style.backgroundColor = '';
        document.getElementById('alert').style.color = '';
        document.getElementById('alert').style.border = '';
        document.getElementById('alert').innerHTML = '';
    }, 2000);
    document.getElementById('alert').innerHTML = `<div>
                <span class="altmsg" >${msg}</span>
            </div>`;
}