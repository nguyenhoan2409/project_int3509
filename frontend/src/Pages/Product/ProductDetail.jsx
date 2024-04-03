import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import axios from "axios";
import Layout from "../Layout/Layout";
import { useParams } from 'react-router-dom';


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
  console.log(product)
  return (
    <div className="">
      <Layout>
        <div className="productdetail">
            {product?.map((product) => (
              <div> {product.product_id} </div>
            ))}
          </div>
      </Layout>
    </div>
  );
};
