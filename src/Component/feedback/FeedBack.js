import React from "react";

const feedback = [
    {
        desc: "I use the Onion Shampoo, Onion Hair Mask, Onion Hair Serum, Ubtan Face Wash, Root Restore Hair Oil and many more. I have been using the products for almost six months now and I've literally got results that I've never got from any other brands (specially hair care products). I love that the products are completely natural.",
        name: "Gina",
        img: "https://mamaearthp.imgix.net/wysiwyg/Gina_kPv81T7.jpg?auto=format",
        rating: "5.0"
    },
    {
        desc: "Mamaearth products are so good and natural. They make my skin and hair feel really healthy. I mostly use Ubtan Face Wash, which is great for tan removal. It is much better than other face washes. Whenever I need any skin or hair care products I buy it from Mamaearth.",
        name: "Waris Raza",
        img: "https://mamaearthp.imgix.net/wysiwyg/Waris_Raza_0nBcBhl.jpg?auto=format",
        rating: "5.0"
    },
    {
        desc: "I wanted to use natural products for my baby and came across Mamaearth two years ago. And I am loving it. I use the Baby Shampoo, Toothpaste, Face Cream and I just love all of them. The website works perfectly. I would suggest you make an app also. Payment is secure and delivery was on time. This is the best brand in this category.",
        name: "Manisha",
        img: "https://mamaearthp.imgix.net/wysiwyg/Manisha_tulV4fo.jpg?auto=format",
        rating: "5.0"
    },
    {
        desc: "I use a number of Mamaearth products - Onion hair fall kit, body lotion and hair oil. I've had one of the best shopping experiences. The delivery was early and easy to track. The website is stable and smooth and easy to navigate. The payment gateway is also smooth and secure.",
        name: "Tanmay",
        img: "https://mamaearthp.imgix.net/wysiwyg/Tanmaya_Shrivastav_JbDYODv.jpg?auto=format",
        rating: "5.0"
    },
    {
        desc: "I wanted to use natural products for my baby and came across Mamaearth two years ago. And I am loving it. I use the Baby Shampoo, Toothpaste, Face Cream and I just love all of them. The website works perfectly. I would suggest you make an app also. Payment is secure and delivery was on time. This is the best brand in this category.",
        name: "Priyanshi Singh",
        img: "https://mamaearthp.imgix.net/wysiwyg/Priyanshi_Singh_gHqZqXk.jpg?auto=format",
        rating:"5.0"
    },
    {
        desc: "I use Mamaearth Ubtan Face Wash. It gives me an instant natural glow. I love that the products are natural and don't contain any harmful preservatives. Plus the products are quite affordable.",
        name: "Sajal Goyal",
        img: "	https://mamaearthp.imgix.net/wysiwyg/Sajal_Goyal_GKFmIuZ.jpg?auto=format",
        rating: "5.0"
    }
]

function FeedBack() {
    return (
        <div className="feedback">
            <div className="feedback-title">
                <div className="feedback-title-name">What Our Customers Say</div>
                <div className="feedback-title-img"><img src="https://mamaearthp.imgix.net/wysiwyg/strip2x.png?auto=format" alt="underline"/></div>
            </div>
            <div className="feedback-content flexRow">
            {
                feedback.map((feed, index) => {
                    return <div key={index} className="feedback-item flexColumn">
                        <div className="feedback-item-desc">
                            {feed.desc}
                        </div>
                        <div className="feedback-item-info flexRow">
                            <div className="feedback-item-info-img">
                                <img src={feed.img} alt="feedback" />
                            </div>
                            <div className="feedback-item-info-detail">
                                <div className="feedback-item-info-name">{feed.name}</div>
                                <div className="feedback-item-info-rating">{feed.rating} <i class="fa-sharp fa-solid fa-star"></i></div>
                            </div>
                        </div>
                    </div>
                })
            }
            </div>
        </div>
    )
}

export default FeedBack