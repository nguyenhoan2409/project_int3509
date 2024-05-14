import React, { useEffect, useState } from "react";
import "./ShopCategory.css";
import { Item } from "../../../components/Item/Item";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { useJwtExpiration } from "~/hooks/use-jwt-expired";


export const ShopCategory = () => {
  const [productList, setProducts] = useState([]);
  const [orderType, setOrderType] = useState("");
  const handleJwtExpired = useJwtExpiration(); 
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/product/list", {
        withCredentials: true,
      });
      setProducts(res.data);
    } catch (error) {
      handleJwtExpired(error); 
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="shop-category">
      <Layout>
        {/* <img className="shopcategory-banner" src={image} /> */}
        <div className="title">Danh sách sản phẩm</div>
        <div className="shopcategory-products">
          {productList?.map((product) => (
              <Item
                product={product}
                key={product.product_id}
              />
          ))}
        </div>
      </Layout>
    </div>
  );
};
