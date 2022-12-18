let business_data = [
    {
        name: "Managing your business",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/98.svg"
    },
    {
        name: "Growing your business",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/99.svg"
    },
    {
        name: "Managing Reviews & Responses",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/97.svg"
    },
    {
        name: "Rental Owner Support",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/99.svg"
    },
    {
        name: "Things to do Operator Support",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/thingsToDo.svg"
    },
    {
        name: "The Fork Manager Support",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/theFork.svg"
    },
    {
        name: "Roam Around Best Practices",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/bestPractices.svg"
    },
    {
        name: "Trust & Safety",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/trustAndSafety.svg"
    }
];
let travellors_data = [
    {
        name: "Manage My Booking",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/104.svg"
    },
    {
        name: "Community & Messages",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/101.svg"
    },
    {
        name: "My Roam Around Account",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/102.svg"
    },
    {
        name: "Manage & Review Your Photos",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/100.svg"
    },
    {
        name: "Make a Booking",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/107.svg"
    },
    {
        name: "Payments",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/106.svg"
    },
    {
        name: "Refunds & Cancellations",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/105.svg"
    },
    {
        name: "Help with Sign In",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/103.svg"
    }, {
        name: "Search & Safety",
        image: "https://www.tripadvisorsupport.com/assets/icons/categories/trustAndSafety.svg"
    }
];
let travel_desc = [
    {
        image: "https://pic.onlinewebfonts.com/svg/img_379716.png",
        heading: "Review Submission Frequency",
        desc:`You may write one review on any given accommodation, restaurant, or attraction per visit. Members may submit subsequent reviews for additional visits as follows:

        Accommodations & Attractions: Reviews for subsequent visits may be submitted three months after the publication of your last review.
        Restaurants: Reviews for subsequent visits may be submitted one month after the publication of your last review.
        You can only submit an updated review once for the same experience.
        You may write an unlimited number of airline reviews for any given airline. An airline review may include just an individual leg of a flight (e.g. London to New York) or the review may cover your entire return experience with an airline (e.g. London to New York to London) if operated by the same airline. If you had multiple stops, your review may also include these legs if it is with the same airline.`
    },
    {
        image: "https://pic.onlinewebfonts.com/svg/img_379716.png",
        heading: "Edit or Remove Review",
        desc:`To remove your review:
        1.Go to your profile.
        2.Click the ellipses (...) button at the top right corner of the review box.
        3.Select Delete and confirm your request by clicking on Delete again.
        The review will immediately disappear from the website. 
        
        TIP: Please note that reviews cannot be edited. The only way to update your review is to delete it and submit an updated version.
        
        
        Was this helpful?
        Contact us`
    },
    {
        image: "https://pic.onlinewebfonts.com/svg/img_379716.png",
        heading: "Remove my rating",
        desc:`To remove your rating:
        1.Click here.
        2.Select your rating.
        3.Select the reason for removal. 
        4.Click Submit. 
        The rating will immediately disappear. 
        
        
        Was this helpful?`
    }, {
        image:"https://pic.onlinewebfonts.com/svg/img_379716.png",
        heading:"Owner Asking Traveller for Review Removal",
        desc:`Tripadvisor absolutely does not condone threats or bullying of reviewers, and you should contact us if this ever happens.

        It is rare that a hotelier threatens a reviewer, but if we are made aware of it, we will take action with the owner. In addition to notifying the owner that this is strictly against Tripadvisor policy, the property will be advised that any future violations of Tripadvisor’s policy towards bullying or threats can result in penalization.
        
        If an owner wishes to use our messaging system to send a travel-related message, the owner must adhere to all of our private messaging guidelines.
        
        Tripadvisor does not facilitate direct contact between owners and members of our travel community. All users on our site remain anonymous unless they decide to post their email address or contact information in their review. To see our privacy policy, click here.`


    }
]
let travel_button2 = document.querySelector(".navbutton2");
let travel_button1 = document.querySelector(".navbutton_1");

let topic_change = document.querySelector("#topics_changedh1");
travel_button2.addEventListener("click", function () {
    topic_change.innerHTML = "Topics for Business owners";
    cards(business_data);


})
travel_button1.addEventListener("click", function () {
    topic_change.innerHTML = "Topics for Travellors";
    cards(travellors_data)


})
let topics = document.querySelector(".realtopics");
function cards(data) {
    topics.innerHTML = "";
    data.forEach(function (el) {
        let cards = document.createElement("div");
        let image = document.createElement("img");
        image.src = el.image;
        let heading = document.createElement("h1");
        heading.innerHTML = el.name;
        cards.append(image, heading);
        topics.append(cards);

    });


}
let pop_links=document.querySelector(".popular_links");
// travel_desc.forEach(function(el){
//     datain.innerHTML=""
//     datain.innerHTML=el.desc.substring(1,75)+" Learn More ...."
// })
desc(travel_desc);
function desc(data){
    data.forEach(function(el){
        let card=document.createElement("div");
        let imagediv=document.createElement("div")
        let image=document.createElement("img");
        image.style.width="15%"
        imagediv.setAttribute("id","images");
        let heading=document.createElement("h2");
        heading.setAttribute("id","heading_popular")
        let description=document.createElement("p");
        image.src=el.image;
        heading.innerText=el.heading;
        description.innerText=el.desc.substring(0,150)+"...Learn More";
        imagediv.append(image)
        card.append(imagediv,heading,description);
        pop_links.append(card)

    })

}