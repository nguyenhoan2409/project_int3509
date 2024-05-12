import React, { useState } from "react";
import { ProductsManagement } from "../ProductsLayout/Products.admin";
import axios from "axios";
import "./CreateProduct.css";
import Layout from "~/Pages/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { private_createTypography } from "@mui/material";
export const CreateProduct = () => {
  const [product_name, setProductName] = useState("");
  const [product_type, setProductType] = useState(2);
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [isFilled, setIsFilled] = useState(false);
  const [msg, setMsg] = useState();

  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const handleCreate = () => {
    // Kiểm tra các trường bắt buộc trước khi thêm sản phẩm
    if (!product_name || !price || !quantity || !thumbnail || !product_type) {
      setMsg("Vui lòng điền đầy đủ thông tin!");
      setIsFilled(false);
    } else {
      setIsFilled(true);
      addProduct();
    }
  };

  const handleNameChange = (event) => {
    if (event.target.value.length <= 30 && event.target.value.length > 0) {
      setProductName(event.target.value);
    } else {
      if (event.target.value.length === 0) {
        setMsg("Tên sản phẩm không được để trống");
      } else setMsg("Tên sản phẩm phải nhỏ hoặc bằng 30 ký tự");
    }
  };
  const handlePriceChange = (event) => {
    if (event.target.value >= 0) {
      setPrice(event.target.value);
    } else {
      setMsg("Giá phải lớn hơn hoặc bằng 0");
    }
  };
  const handleQuantityChange = (event) => {
    if (event.target.value >= 0) {
      setQuantity(event.target.value);
    } else {
      setMsg("Số lượng trong kho phải lớn hơn hoặc bằng 0");
    }
  };
  const handleDescriptionChange = (event) => {
    const value = event.target.value
    if(value.length >= 30) {
      setIsFilled(false)
      setMsg("Mô tả sản phẩm không được quá 30 kí tự")
    } else {
      setDescription(value)
    }
  };
  const handleThumbnailChange = (event) => {
      const thumbnail  = URL.createObjectURL(event.target.files[0]); // Tạo đường dẫn tạm thời cho hình ảnh được chọn
      setThumbnail(thumbnail);
  };
  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const addProduct = async () => {
    try {
      console.log({
        product_name,
        price,
        quantity,
        thumbnail,
        description,
        product_type,
      })
      const response = await axios.post("http://localhost:8080/product/add", {
        product_name,
        price,
        quantity,
        thumbnail,
        description,
        product_type,
      }, {
        withCredentials: true,
      });
      setMsg("Thêm sản phẩm thành công");
      navigate("/admin/products/list");
    } catch (error) {
      if (error.response) {
        setIsFilled(false);
        setMsg(error.response.data);
      }
    }
  };
  console.log(msg);
  return (
    <Layout>
      <div>
        <ProductsManagement />
        <div className="create-product-form">
          <div className="create-product-left">
            <img src={thumbnail} alt="" />
          </div>
          <div className="create-product-right">
            <div className="create-product-row">
              <p> Tên sản phẩm : </p>
              <input type="text" onChange={handleNameChange} name = "product_name" value={product_name}/>
            </div>
            <div className="create-product-row">
              <p> Giá : </p>
              <input type="number" onChange={handlePriceChange} name = "price" value={price}/>
            </div>
            <div className="create-product-row">
              <p> Số lượng kho: </p>
              <input type="number" onChange={handleQuantityChange} name = "quantity" value={quantity}/>
            </div>
            <div className="create-product-row">            
              <p> Ảnh : </p>
              <input type="file" accept=".png, .jpg, .jpeg, .gif" onChange={handleThumbnailChange} name = "thumbnail" />
            </div>
            <div className="create-product-row">
              <p> Mô tả : </p>
              <input type="text" onChange={handleDescriptionChange}  name = "description" value={description}/>
            </div>
            <div className="create-product-row">
              <p> Loại : </p>
              <select value={product_type} onChange={handleProductTypeChange} name = "product_type">
                <option value="2">Mua</option>
                <option value="1">Mượn</option>
                <option value="3">Thuê</option>
              </select>
            </div>
            <button onClick={handleCreate} className="create-product-btn">Thêm sản phẩm</button>
            {!isFilled && <p className="msg-create-error">{msg}</p>}
            {isFilled && <p className="msg-create">{msg}</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
};