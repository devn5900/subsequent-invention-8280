let hotel = 'https://636a539ec07d8f936d9a5d5e.mockapi.io/awadhStore/roamAround';
let blogs = 'https://636a539ec07d8f936d9a5d5e.mockapi.io/awadhStore/roamAroundBlogs';
///////////////////////////////////////////////////////////////////////////////////
let verify = JSON.parse(localStorage.getItem('adminDetails')) || {};
if (verify.stat == false) {
    window.location.href = './login.html';
} else {
    document.getElementById('adNM').innerText = verify.name.toUpperCase();
}
document.getElementById('adNM').addEventListener('click', () => {
    verify.stat = false;
    localStorage.setItem('adminDetails', JSON.stringify(verify));
    window.location.href = './dashboard.html';
})
////////////////////////////////////////////////////////////////////////////////////
let container = document.getElementById('adminFunc')
document.getElementById('dash').addEventListener('click', (e) => {
    e.preventDefault();
    getDash();

})
getDash();
async function getDash() {
    preloader();
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
        document.querySelector('#addHtl').addEventListener('submit', (e) => {
            e.preventDefault();
            let addHtl = document.querySelectorAll('#addHtl input');
            let obj = {};
            for (let i = 0; i < addHtl.length - 1; i++) {
                obj[addHtl[i].id] = addHtl[i].value;
            }
            obj['desc'] = document.getElementById('desc').value;
            obj['checkin'] = new Date().toLocaleTimeString();
            obj['checkout'] = new Date().toLocaleTimeString();
            obj['rating'] = (Math.random() * 8 + 1).toFixed(0);
            console.log(obj);
            postData(obj);
        });
    }, 1000);

});
async function postData(obj) {
    let res = await fetch(hotel, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    if (res.ok) {
        let data = await res.json();
        console.log(data);
        alert('Hotel Added !', '#467A56', '#467A56', '#95D59D');
        document.querySelector('#addHtl').reset();

    } else {
        console.log('Add Hotel Error');
    }
}
function newHotel() {
    return `   <div class="add">
                <h2 class='headTag'>Add New Hotels</h2>
                <form id="addHtl" class="addHtl">
                    <input type="text" id="title" placeholder="Hotel Name"><br>
                    <textarea id="desc" placeholder="About to Hotels" cols="25" rows="5"></textarea>
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
            console.log(data);
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
    // console.log(mapped);
    return mapped;
}
function showHotel({ title, desc, image, price, rating, checkin, checkout, phone, id, location }) {
    console.log();
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
        document.querySelector('#writeBlog').addEventListener('submit', (e) => {
            e.preventDefault();
            let addHtl = document.querySelectorAll('#writeBlog input');
            let obj = {};
            for (let i = 0; i < addHtl.length - 1; i++) {
                obj[addHtl[i].id] = addHtl[i].value;
            }
            obj['desc'] = document.getElementById('desc').value;
            obj['createdAt'] = new Date().toLocaleTimeString();
            obj['like'] = Number((Math.random() * 888 + 1).toFixed(0));
            // console.log(obj);
            postBlogData(obj);
            //             {
            // "id": "1",
            // "desc": "Neil Island is one of India’s Andaman Islands, in the Bay of Bengal. Bharatpur Beach has coral reefs teeming with tropical fish. Laxmanpur Beach is known for its sunset views. Howrah Bridge is a natural rock formation accessible at low tide. Near the island’s wharf is Neil Kendra village, with a curving, sandy bay dotted with boats. Off the southeast coast, the tiny Sir Hugh Rose Island is a sanctuary for turtles.",
            // "image": "https://uploads-ssl.webflow.com/5b56319971ac8c7475a9d877/5c4f5622a29a8f65c7f25f3e_IMG_7728%20Neil%20Island%20(21).jpg",
            // "location": "Andaman & Nicobar"
            // "title": "NEIL ISLAND",
            // "writer": "admin",
            // "like": 829,
            // "createdAt": "9:26:19 PM",
            // }
        });
    }, 500);

})
async function postBlogData(obj) {
    let res = await fetch(blogs, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    if (res.ok) {
        let data = await res.json();
        console.log(data);
        alert('Blog Posted !', '#467A56', '#467A56', '#95D59D');
        document.querySelector('#writeBlog').reset();

    } else {
        console.log('Add Hotel Error');
    }
}
function writeBlog() {
    return ` <div class="add">
                <h2 class='headTag'>Write Blogs</h2>
                <form id="writeBlog" class="addHtl">
                    <input type="text" id="title" placeholder="Blog Title"><br>
                    <textarea id="desc" placeholder="Blog Content" cols="25" rows="5"></textarea>
                    <br>
                    <input type="text" id="image" placeholder="Image"><br>
                    <input type="text" id="writer" placeholder="Writer"><br>
                    <input type="text" id="location" placeholder="Location"><br>
                    <input type="submit" value="POST BLOG">
                </form>
            </div>`;

}
/////////////////////////////////////////////////////////////////////////////////
document.getElementById('shoBlo').addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = '';
    preloader();
    fetchBlogs();
});
async function fetchBlogs() {
    try {
        let res = await fetch(blogs);
        if (res.ok) {
            let data = await res.json();
            console.log(data);
            appenBlogs(data);
        } else {
            console.log('Error');
        }
    } catch (error) {
        console.log(error);
    }
}
function appenBlogs(data) {
    let mapped = mapBlogData(data);
    // console.log(mapped);
    container.innerHTML = `   <div class="hotelsdiv">
                                  <h2 class='headTag'>All Blogs</h2>
                                <input type="text" id="searchHotel" placeholder="Search By Places, Tag, Location...." />
                                  <div id='hoItem'>  ${mapped.join('')}
                               </div>
                            </div>`;
    document.getElementById('searchHotel').addEventListener('input', (e) => {
        e.preventDefault();
        let searHotl = document.getElementById('searchHotel').value;
        let sear = data.reduce((acc, el) => {
            if (el.writer.toLowerCase().includes(searHotl.toLowerCase()) || el.location.toLowerCase().includes(searHotl.toLowerCase()) || el.title.toLowerCase().includes(searHotl.toLowerCase()) || el.desc.toLowerCase().includes(searHotl.toLowerCase())) {
                acc.push(el);
            }
            return acc;
        }, []);
        let mapd = mapBlogData(sear);
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
                // console.log(e.target.dataset.id);
                editBlog(e.target.dataset.id);
            });
        });
        let delB = document.querySelectorAll('.deleteBlog');
        delB.forEach((el) => {
            el.addEventListener('click', (e) => {
                if (confirm('Do you want to delete....?')) {
                    deleteBlog(e.target.dataset.id);
                    // console.log(e.target.dataset.id);
                }
            });
        })
    });
    let edB = document.querySelectorAll('.editBlog');
    edB.forEach((el) => {
        el.addEventListener('click', (e) => {
            console.log(e.target.dataset.id);
            editBlog(e.target.dataset.id);
        });
    })
    let delB = document.querySelectorAll('.deleteBlog');
    delB.forEach((el) => {
        el.addEventListener('click', (e) => {
            if (confirm('Do you want to delete....?')) {
                deleteBlog(e.target.dataset.id);
                // console.log(e.target.dataset.id);
            }
        });
    })
}
async function deleteBlog(id) {
    let res = await fetch(`${blogs}/${id}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        let data = await res.json();
        alert('Deleted Successfuly !', 'red', 'tomato', '#f1af90');
        console.log(data);
        container.innerHTML = '';
        preloader();
        fetchBlogs();
    } else {
        console.log('Deleting Error');
    }
}

async function editBlog(id) {
    container.innerHTML = '';
    preloader();
    // fetchHotel();
    let res = await fetch(`${blogs}/${id}`);
    if (res.ok) {
        let data = await res.json();
        // console.log(data);
        let ed = editIndiBlog(data);
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
        obj['createdAt'] = new Date().toLocaleTimeString();
        obj['like'] = Number(((Math.random() * 888) + 1).toFixed(0));

        console.log(obj);
        //         {
        // "createdAt": "9:26:19 PM",
        // "title": "NEIL ISLAND",
        // "image": "https://uploads-ssl.webflow.com/5b56319971ac8c7475a9d877/5c4f5622a29a8f65c7f25f3e_IMG_7728%20Neil%20Island%20(21).jpg",
        // "desc": "Neil Island is one of India’s Andaman Islands, in the Bay of Bengal. Bharatpur Beach has coral reefs teeming with tropical fish. Laxmanpur Beach is known for its sunset views. Howrah Bridge is a natural rock formation accessible at low tide. Near the island’s wharf is Neil Kendra village, with a curving, sandy bay dotted with boats. Off the southeast coast, the tiny Sir Hugh Rose Island is a sanctuary for turtles.",
        // "writer": "admin",
        // "like": 829,
        // "id": "1",
        // "location": "Andaman & Nicobar"
        // }
        updateBlog(obj, id);
    })
    document.getElementById('closeeditHotel').addEventListener('click', (e) => {
        e.preventDefault();
        container.innerHTML = '';
        preloader();
        fetchBlogs();
    });
}
async function updateBlog(obj, id) {
    let res = await fetch(`${blogs}/${id}`, {
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
            fetchBlogs();
        }, 2000);
    } else {
        console.log('Not Updated');
    }
}
function editIndiBlog({ id, title, location, writer, like, desc, image, createdAt }) {
    return `   <div class="add">
            <button id='closeeditHotel'>Back</button>
                <h2 class='headTag'>Edit Blogs</h2>
                <form id="editIndHotel" class="addHtl">
                    <input type="text"   value="${title}" id="title" placeholder="Hotel Name"><br>
                    <textarea id="desc" placeholder="Blog Content" cols="25" rows="5">${desc}</textarea>
                    <br>
                    <input type="text"   value=${image} id="image" placeholder="Image"><br>
                    <input type="text" value="${writer}" id="writer" placeholder="Writer"><br>
                    <input type="text"   value=${location} id="location" placeholder="Location"><br>
                    <input type="hidden"   value=${id} id="id" /><br>
                    <input type="submit" id="submit" value="UPDATE HOTEL">
                </form>
            </div>`;
}
function showBlogs({ id, title, location, writer, like, desc, image, createdAt }) {
    return ` <div class="items">
                    <div class="item">
                        <div><img src=${image} alt=""></div>
                        <div>
                            <div>
                                <span>${title}</span>
                                (<span>${location}</span>)
                            </div>
                            <div>
                                <span>${writer}</span>
                                <span>${createdAt}</span>
                            </div>
                            <p>${desc.substring(0, 150)}</p>
                        </div>
                        <div class="blogbtn">
                            <button data-id=${id} class="editBlog">Edit</button>
                            <button data-id=${id} class="deleteBlog">Delete</button>
                        </div>
                    </div>
                </div>`;
}
function mapBlogData(data) {
    let mapped = data.map((el) => {
        return showBlogs(el);
    });

    return mapped;
}
////////////////////////////////////////////////////////////////////////////////////
function preloader() {
    container.innerHTML = `<div id="preloader">
  <div id="loader"></div>
</div>`;
}
///////////////////////////////////////////////////////////////////////////////////////
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