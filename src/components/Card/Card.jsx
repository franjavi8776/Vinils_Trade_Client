import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, title, year, cover_image }) => {
  return (
    <div className="w-60 h-70 ">
      <Link to={`/detail/${id}`}>
        <h2 className="text-sm h-10">{title}</h2>
        <img className="w-48 h-48 m-auto" src={cover_image} alt={title} />
        <h2>{year}</h2>
      </Link>
    </div>
  );
};

export default Card;
