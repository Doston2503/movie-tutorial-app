import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {imgUrl} from "../config/config";

function Carousel({carousel}) {
    const responsive = {
        0: {items: 1},
        768: {items: 2},
        1024: {items: 7}
    };

    function getInfo() {
        return carousel ? carousel?.map(item=>(
            <div key={item.id}>
                <img src={imgUrl+item?.profile_path} style={{width:'100px'}} alt={item?.name}/>
                <b className="text-white d-block">{item.name}</b>
            </div>
        )):[]
    }

    return (
        <AliceCarousel
            mouseTracking
            items={getInfo()}
            disableDotsControls
            disableButtonsControls
            autoPlay
            autoPlayInterval={1000}
            infinite={true}
            responsive={responsive}
        />
    );
}

export default Carousel;