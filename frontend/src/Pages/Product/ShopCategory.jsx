import React, { useEffect, useState } from "react";
import "./ShopCategory.css";
import { Item } from "./../../Components/Item/Item";
import image from "../../Components/Assets/banner_uniform.png";
import { Footer } from "~/Components/Footer/Footer";
import Layout from "../Layout/Layout";
import axios from "axios";


export const ShopCategory = () => {
  const [productList, setProducts] = useState([]);
  const [orderType, setOrderType] = useState("");
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/product/list");
      setProducts(res.data);
      const productList = res.data
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
              <Item
                id={product.product_id}
                image={product.thumbnail}
                name={product.product_name}
                order={product.product_type}
              />
          ))}
        </div>
      </Layout>
    </div>
  );
};
