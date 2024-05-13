import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsManagement } from "../ProductsLayout/Products.admin";
import './UpdateProduct.css'
import Layout from "~/components/Layout/Layout";

export const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [product_type, setOrderType] = useState(2);
  const [isFilled, setIsFilled] = useState(false);
  const [msg, setMsg] = useState();
  const navigate = useNavigate();
  const handleUpdate = () => {
    // Kiểm tra các trường bắt buộc trước khi cập nhật sản phẩm
    if  (price === ''|| quantity === '' || thumbnail === '' || product_type=== '') {
       setMsg("Vui lòng điền đầy đủ thông tin!")
       setIsFilled(false)
    } else {
       getUpdate()
    }
  }
  const handlePriceChange = (event) => {
    const value = event.target.value
    if(value >= 0 ) {
      setPrice(value)
    } else {
      setIsFilled(false)
      setMsg("Giá phải lớn hơn hoặc bằng 0")
    }
  }
  const handleDescriptionChange = (event) => {
    const value = event.target.value
    if(value.length >= 30) {
      setIsFilled(false)
      setMsg("Mô tả sản phẩm không được quá 30 kí tự")
    } else {
      setDescription(value)
    }
  }

  const handleQuantityChange = (event) => {
    const value = event.target.value
    if(value >= 0 ) {
      setQuantity(value)
    } else {
      setIsFilled(false)
      setMsg("Số lượng kho phải lớn hơn hoặc bằng 0")
    }
  }

  const handleThumbnailChange = (event) => {
    const thumbnail  = URL.createObjectURL(event.target.files[0]); // Tạo đường dẫn tạm thời cho hình ảnh được chọn
    setThumbnail(thumbnail);
  }
  const getDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/detail/${id}`, {
        withCredentials: true,
      });
      const products = response.data;
      const product = products[0];
      setProduct(product);
      setPrice(product.price);
      setDescription(product.description);
      setQuantity(product.quantity);
      setThumbnail(product.thumbnail);
      setOrderType(product.product_type);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }
  const getUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/product/update/${id}`, {
        price,
        description,
        quantity,
        thumbnail,
        product_type
      }, {
        withCredentials: true,
      });
      setMsg(response.data.msg);
      setIsFilled(true)
      setTimeout(() => {
        navigate('/admin/products/list'); 
      }, 1000)
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
    <Layout>
      <div className="">
      <ProductsManagement />
        <div className="update-product-form">
          <div className="update-product-left">
            <img src={thumbnail} alt="" />
          </div>
          <div className="update-product-right">
            <div className="update-product-row"> <p> Tên sản phẩm : </p> <input type="text" value={product.product_name} name = "product_name"/></div>
            <div className="update-product-row"> <p> Giá : </p> <input type="number" value={price} onChange={handlePriceChange} name = "price"/></div>
            <div className="update-product-row"> <p> Mô tả : </p> <input type="text" value={description} onChange={handleDescriptionChange} name = "description" /></div>
            <div className="update-product-row"> <p> Số lượng : </p> <input type="number" value={quantity} onChange={handleQuantityChange} name = "quantity"/></div>
            <div className="update-product-row"> <p> Ảnh : </p> <input type="file" accept=".png, .jpg, .jpeg, .gif" onChange={handleThumbnailChange} name = "thumbnail"/></div>
            <div className="update-product-row"> 
            <p> Loại : </p> 
            <select value={product_type} onChange={e => setOrderType(e.target.value)} name = "product_type">
              <option value="2">Mua</option>
              <option value="1">Mượn</option>
              <option value="3">Thuê</option>
             </select>
          </div>
            <button onClick={handleUpdate} className="btn-update-product">CẬP NHẬT</button>
            {!isFilled && <p className="msg-update-error">{msg}</p>}
            {isFilled && <p className="msg-update">{msg}</p>}
          </div>

        </div>
      </div>
    </Layout>
    
  );
};