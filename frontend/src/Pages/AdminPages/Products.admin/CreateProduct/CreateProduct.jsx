import React, { useState } from 'react'
import { ProductsManagement } from '../ProductsLayout/Products.admin';
import axios from 'axios';
import './CreateProduct.css'
import { Sidebar } from '~/Components/SideBar/Sidebar';
export const CreateProduct = () => {
  const [product_name, setProductName] = useState();
  const [order_type, setOrderType] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [isFilled, setIsFilled] = useState(false);
  const [msg, setMsg] = useState();
  
  const handleCreate = () => {
    // Kiểm tra các trường bắt buộc trước khi thêm sản phẩm
    if (!product_name || !price || !quantity || !thumbnail || !order_type) {
        setMsg("Vui lòng điền đầy đủ thông tin!")
       setIsFilled(false)
    } else {
       setIsFilled(true)
       addProduct()
    }
  }

  const addProduct = async () => {
    try {
      const response = await axios.post("http://localhost:8080/product/add", {
        product_name,
        price,
        quantity,
        thumbnail,
        description,
        order_type
      });
      setMsg(response.msg);  
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        setMsg(error.response.data);
      }
    }
  }
  console.log(msg)
  return (
    <div>
      <ProductsManagement />
      <div className="create-product-form">
        <div className="create-product-left">
          <img src={thumbnail} alt="" />
        </div>
        <div className="create-product-right">
          <div className="create-product-row"> <p> Tên sản phẩm : </p> <input type="text" onChange={e => setProductName(e.target.value)} /></div>
          <div className="create-product-row"> <p> Giá : </p> <input type="number" onChange={e => setPrice(e.target.value)} /></div>
          <div className="create-product-row"> <p> Số lượng kho: </p> <input type="number" onChange={e => setQuantity(e.target.value)} /></div>
          <div className="create-product-row"> <p> Link ảnh : </p> <input type="text" onChange={e => setThumbnail(e.target.value)} /></div>
          <div className="create-product-row"> <p> Mô tả : </p> <input type="text" onChange={e => setDescription(e.target.value)} /></div>
          <div className="create-product-row"> 
            <p> Loại : </p> 
            <select value={order_type} onChange={e => setOrderType(e.target.value)}>
              <option value="Mua">Mua</option>
              <option value="Mượn">Mượn</option>
              <option value="Thuê">Thuê</option>
             </select>
          </div>
          <button onClick={handleCreate}>Thêm sản phẩm</button>
          {!isFilled && <p className='msg-create-error'>{msg}</p>}
          {isFilled && <p className='msg-create'>{msg}</p>}
        </div>
      </div>
    </div>

  )
}