import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import axios from "axios";
import Layout from "../Layout/Layout";
import { useParams } from 'react-router-dom';
import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineDollar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const getDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/detail/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <div className="">
      <Layout>
        <div className="productdetails">
          {product?.map((product) => (
            <div className="product-detail">
              <img src={product.thumbnail} />
              <div className="product-right">
                <div className="product-name">
                  <div className="text">{product.product_name}</div>
                </div>
                <div className = "review">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                    <p> 2350 lượt {product.product_type} | 440 lượt đánh giá</p>
                   </div>
                <div className="product-price">
                  <div className="icon">
                    <AiOutlineDollar />
                  </div>
                  <p className="text">{product.price}</p>
                  <p className="text-coin"> đ </p>
                </div>
                <div className="quantity-description">
                <p>Số lượng trong kho: </p>
                <p>{product.quantity}</p>
                </div>
                <div className="quantity-description">
                <p>Mô tả:  </p>
                <p>{product.description}</p>
                </div>
                <Link to = {`/create-request/${id}`} >
                <div className="order-button"><button>{product.product_type === 1 ? "Mượn" : (product.product_type === 2 ? "Mua" : "Thuê")}</button></div>
                </Link>
              </div>

            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
};
