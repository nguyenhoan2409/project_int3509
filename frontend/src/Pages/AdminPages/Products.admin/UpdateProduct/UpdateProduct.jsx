import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { ProductsManagement } from "../ProductsLayout/Products.admin";
import './UpdateProduct.css'

export const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [order_type, setOrderType] = useState();
  const [isFilled, setIsFilled] = useState();
  const [msg, setMsg] = useState();
  const handleUpdate = () => {
    // Kiểm tra các trường bắt buộc trước khi cập nhật sản phẩm
    if  (price === ''|| quantity === '' || thumbnail === '' || order_type=== '') {
       setMsg("Vui lòng điền đầy đủ thông tin!")
       setIsFilled(false)
    } else {
       setIsFilled(true)
       getUpdate()
    }
  }
  const handlePriceChange = (event) => {
    const value = event.target.value
    if(value >= 0 ) {
      setPrice(value)
    } else {
      alert("Giá phải lớn hơn hoặc bằng 0")
      setPrice(0)
    }
  }
  const handleDescriptionChange = (event) => {
    const value = event.target.value
    setDescription(value)
  }

  const handleQuantityChange = (event) => {
    const value = event.target.value
    if(value >= 0 ) {
      setQuantity(value)
    } else {
      alert("Số lượng kho phải lớn hơn hoặc bằng 0")
      setQuantity(0)
    }
  }

  const handleThumbnailChange = (event) => {
    const value = event.target.value
    if(value !== "" ) {
      setThumbnail(value)
    } else {
      alert("Bạn chưa nhập link ảnh")
    }
  }
  const getDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/product/detail/${id}`);
      const products = response.data;
      const product = products[0];
      setProduct(product);
      setPrice(product.price);
      setDescription(product.description);
      setQuantity(product.quantity);
      setThumbnail(product.thumbnail);
      setOrderType(product.order_type);
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
        order_type
      });
      setMsg(response.data.msg);
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

  const [sideBarClick, setSideBarClick] = useState(false);
    const handleClick = () => {
      setSideBarClick(!sideBarClick);
    }
    console.log(sideBarClick)
  return (
    <div className="">
      <ProductsManagement sideBarClick={sideBarClick} handleClick={handleClick}/>
        <div className="update-product-form" style={{marginLeft: sideBarClick ? "220px" : "0px", marginTop: sideBarClick? "-560px" : "10px", width : sideBarClick ? "calc(100% - 220px)" : "100%" }}>
          <div className="update-product-left">
            <img src={thumbnail} alt="" />
          </div>
          <div className="update-product-right">
            <div className="update-product-row"> <p> Tên sản phẩm : </p> <input type="text" value={product.product_name} /></div>
            <div className="update-product-row"> <p> Giá : </p> <input type="number" value={price} onChange={handlePriceChange} /></div>
            <div className="update-product-row"> <p> Mô tả : </p> <input type="text" value={description} onChange={handleDescriptionChange} /></div>
            <div className="update-product-row"> <p> Số lượng : </p> <input type="number" value={quantity} onChange={handleQuantityChange} /></div>
            <div className="update-product-row"> <p> Ảnh : </p> <input type="text" value={thumbnail} onChange={handleThumbnailChange} /></div>
            <div className="update-product-row"> 
            <p> Loại : </p> 
            <select value={order_type} onChange={e => setOrderType(e.target.value)}>
              <option value="Mua">Mua</option>
              <option value="Mượn">Mượn</option>
              <option value="Thuê">Thuê</option>
             </select>
          </div>
            <button onClick={handleUpdate}>Cập nhật</button>
            {!isFilled && <p className="msg-update-error">{msg}</p>}
            {isFilled && <p className="msg-update">{msg}</p>}
          </div>

        </div>
      </div>
  );
};