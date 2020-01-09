import React from "react";
import "./card.css";

// const Cards = props => (
//     <div className="card" onClick={() => props.clickedImage(props.id)}>
//         <div className="img-container">
//             <img alt="" src={props.images} key={props.id} />
//         </div>
//     </div>
// );

const Cards = props => (
    <div className="card">
        <img alt={props.name} src={props.image} id={props.id} className='logic'
            onClick={() => props.logic(props.id)} />
    </div>
);

export default Cards;