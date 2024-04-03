import React, { useEffect, useState } from "react";
import "./ShopCategory.css";
import { Item } from "./../../Components/Item/Item";
import image from "../../Components/Assets/banner_uniform.png";
import { Navbar } from "~/Components/Navbar/Navbar";
import { Footer } from "~/Components/Footer/Footer";
import Layout from "../Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

export const ShopCategory = () => {
  const [productList, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/product/list");
      setProducts(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }
  useEffect(() => {
    getProducts();
  }, [])
console.log(productList)
console.log("Hello")
  return (
    <div className="shop-category">
      <Layout>
        <img className="shopcategory-banner" src={image} />
        <div className="shopcategory-products">
          {productList?.map((product) => (
            <Link to= {`/product/detail/${product.product_id}`}>
              <Item
              key={product.product_id}
              image={product.thumbnail}
              name={product.product_name}
              order={product.order_type}
            />
            </Link>
          ))}
        </div>
      </Layout>
    </div>
  );
};
