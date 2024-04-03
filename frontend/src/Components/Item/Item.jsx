import React from 'react'
import './Item.css'
import { Link, useNavigate } from "react-router-dom";

export const Item = ({ image, name, order }) => {

  return (
    <div className="product">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <button>{order}</button>
    </div>

  );
};

