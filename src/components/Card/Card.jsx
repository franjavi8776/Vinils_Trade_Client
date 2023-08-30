import React from "react";
import { Link } from "react-router-dom";

const Card = ({id,title,year,cover_image}) => {
  return (
    <div>
      <Link to={`/detail/${id}`}>
         <h2>{title}</h2>
         <h2>{year}</h2>
         <img src={cover_image} alt={title} />
      </Link>
    </div>
  )
};

export default Card;
