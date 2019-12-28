import React from "react";
import "./card.css";

const Cards = props => (
    <div className="card" onClick={() => props.clickedImage(props.id)}>
        <div className="img-container">
            <img alt="" src={props.images} />
        </div>
    </div>
);

export default Cards;