import React from 'react'
import './Item.css'
import { Link } from "react-router-dom";
export const Item = ({ image, name, order, id }) => {

  return (
    
      <div className="product">
        <Link to= {`/product/detail/${id}`}><img src={image} alt={name} /></Link>
        <p className='name'>{name}</p>
        <Link to= {`/product/detail/${id}`}><button>{order}</button></Link>
    </div>
    

  );
};

