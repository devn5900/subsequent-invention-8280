function navbar() {
    return `  <div id="hotel-header">

        <div id="hotel-header-left">
            <img src="https://i.postimg.cc/cC7cGnCk/Roam-Around-logo.png" alt="Rome-Around">
            <div id="search">
                <input type="text" id="city" placeholder="Search.....">
                <button id="city-search"> Search</button>
            </div>
        </div>

        <div id="hotel-header-right">
            <div>
                <img src="https://th.bing.com/th/id/OIP.xJHU5ymDz9RTGwwmZOCYGAHaHa?w=191&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt="">
                <a href="#">Review</a>
            </div>
            <div>
                <img src="https://th.bing.com/th/id/OIP.IJ3y7ec3b_RBwkDT3qmbswHaG4?w=208&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt="">
                <a href="#">Trips</a>
            </div>
            <div>
                <img src="https://th.bing.com/th/id/OIP.L15u7GCz05yErR1F6PIMUgHaHa?w=213&h=213&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt="">
                <a href="#">Alerts</a>
            </div>
            <div>
                <img src="https://static.vecteezy.com/system/resources/previews/000/574/829/original/vector-login-sign-icon.jpg"
                    alt="">
                <a href="#">Login</a>
            </div>
        </div>
    </div>

    <hr style="border-width: 1px; margin-top: 10px;">
    <div id="nav">
        <a href="#" class="hvr-underline-from-center">All Things</a>
        <a href="hotel.html" class="hvr-underline-from-center">Hotels</a>
        <a href="places.html" class="hvr-underline-from-center">Places</a>
        <a href="#" class="hvr-underline-from-center">Restaurants</a>
        <a href="#" class="hvr-underline-from-center"> Flights</a>
        <a href="#" class="hvr-underline-from-center">Holiday Homes</a>
        <a href="#" class="hvr-underline-from-center">Travel Stories</a>
        <a href="#" class="hvr-underline-from-center">Cruises</a>
        <a href="#">...</a>
    </div>`
}
function sectionBody() {
    // return `<div id="types">
    //         <div>
    //             <div style="margin-left:5px; font-weight: bolder;">Hotels</div>
    //             <div><i class="fa-sharp fa-solid fa-bed"></i></div>
    //         </div>

    //         <div>
    //             <div style="margin-left:5px; font-weight: bolder;">Holiday Homes</div>
    //             <div><i class="fa-solid fa-house"></i></div>
    //         </div>

    //         <div>
    //             <div style="margin-left:5px; font-weight: bolder;">Things To Do</div>
    //             <div><i class="fa-brands fa-creative-commons-nd"></i></div>
    //         </div>

    //         <div>
    //             <div style="margin-left:5px; font-weight: bolder;">Restaurants</div>
    //             <div><i class="fa-solid fa-utensils"></i></div>
    //         </div>

    //         <div>
    //             <div style="margin-left:5px; font-weight: bolder;">Travels Stories</div>
    //             <div><i class="fa-sharp fa-solid fa-globe"></i></div>
    //         </div>

    //         <div>
    //             <div style="margin-left:5px; font-weight: bolder;">More</div>
    //             <div><i class="fa-solid fa-ellipsis"></i></div>
    //         </div>

    //     </div>


    //     <div id="search">
    //         <img src="https://static.tacdn.com/img2/brand/home/homemar2022_dt_trans.webp" />
    //         <input type="text" placeholder="Where to.........">
    //     </div>`;
    return '';
}

function footer() {
    return ` <div>
            <div>
                <div>
                    <p>About Tripadvisor</p>
                    <ul class="options" style="list-style-type:none; line-height: 1.9em; text-decoration: none">

                        <li><a class="remove-line" href="#">About Us</a></li>
                        <li><a class="remove-line" href="#">Press</a></li>
                        <li><a class="remove-line" href="#">Resouce And Policies</a></li>
                        <li><a class="remove-line" href="#">Careers</a></li>
                        <li><a class="remove-line" href="#">Trust & Saftey</a></li>
                        <li><a class="remove-line" href="#">Contact Us</a></li>

                    </ul>
                </div>
                <div>
                    <p>Explore</p>
                    <ul class="options" style="list-style-type:none; line-height: 1.9em; text-decoration: none">

                        <li><a class="remove-line" href="#">Write a review</a></li>
                        <li><a class="remove-line" href="#">Add a place</a></li>
                        <li><a class="remove-line" href="#">Join</a></li>
                        <li><a class="remove-line" href="#">Travellers Choice</a></li>
                        <li><a class="remove-line" href="#">Green Leaders</a></li>
                        <li><a class="remove-line" href="#">Help Centers</a></li>

                    </ul>
                </div>
                <div>
                    <p>Do Business With Us</p>
                    <ul class="options" style="list-style-type:none; line-height: 1.9em; text-decoration: none">

                        <li><a class="remove-line" href="#">Owners & DMO/CVB</a></li>
                        <li><a class="remove-line" href="#">Business Advantage</a></li>
                        <li><a class="remove-line" href="#">Sponsered Placements</a></li>
                        <li><a class="remove-line" href="#">Access our content API</a></li>

                    </ul>

                    <p>Get The App</p>
                    <ul class="options" style="list-style-type:none; line-height: 1.9em; text-decoration: none">
                        <li><a class="remove-line" href="#">iPhone App</a></li>
                        <li><a class="remove-line" href="#">Android App</a></li>
                    </ul>
                </div>
            </div>

            <div>
                <p>Tripadvisor Site</p>
                <p>Book tours and attraction tickets on <a>Viator</a></p>
            </div>

        </div>
`;
}
export { navbar, sectionBody, footer }