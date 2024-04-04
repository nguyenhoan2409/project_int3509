import React from 'react'
import './Item.css'
import { Link } from "react-router-dom";
export const Item = ({ image, name, order, id }) => {

  return (
    <Link to= {`/product/detail/${id}`} >
      <div className="product">
      <img src={image} alt={name} />
      <p className='name'>{name}</p>
      <button>{order}</button>
    </div>
    </Link>

  );
};

