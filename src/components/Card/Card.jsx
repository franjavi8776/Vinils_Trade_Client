import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, title, year, cover_image }) => {
  return (
    <div className="w-60 h-60 bg-red-100">
      <Link to={`/detail/${id}`}>
        <h2 className="text-sm">{title}</h2>
        <img className="w-48 h-48" src={cover_image} alt={title} />
        <h2>{year}</h2>
      </Link>
    </div>
  );
};

export default Card;
