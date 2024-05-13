import React from "react";
import "./Item.css";
import { Link, useNavigate } from "react-router-dom";
export const Item = ({ product }) => {
  const handleTabClick = () => {
    window.scrollTo(0, 0);
  };
  const navigate = useNavigate();
  return (
    <div className="product">
      <img
        src={product.thumbnail}
        alt={product.product_name}
        className="product-image"
        onClick={() => navigate(`/product/detail/${product.product_id}`)}
      />
      <p className="name">{product.product_name}</p>
      <button
        className="btn-request"
        onClick={() => {
          handleTabClick();
          navigate(`/create-request/${product.product_id}`);
        }}
      >
        {product.product_type === 1
          ? "Mượn"
          : product.product_type === 2
          ? "Mua"
          : "Thuê"}
      </button>
    </div>
  );
};
