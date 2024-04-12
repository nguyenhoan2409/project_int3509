import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '~/features/authSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import "./ProductsList.css"
import { ProductsManagement } from '../ProductsLayout/Products.admin';
import Layout from '~/Pages/Layout/Layout';
export const ProductsList = () => {
    const [products, setProducts] = useState([]);
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
    }, []);
    
    return (
        <Layout>
            <div>
            <ProductsManagement/>
                <div className="products-list">
                    <table className="products-list-table">
                        <thead>
                            <tr className='products-list-tr'>
                                <th className="products-id">ID</th>
                                <th className="products-thumbnails"> Ảnh sản phẩm</th>
                                <th className="products-name">Tên sản phẩm </th>
                                <th className="products-price">Giá </th>
                                <th className="products-1">Số lượng trong kho</th>
                                <th className="products-2">Số lượng hiện có</th>
                                <th className="descriptions">Mô tả</th>
                                <th className="order-type">Mua/Mượn/Thuê</th>
                                <th className="products-update">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product, index) => (
                                <tr className='products-list-tr' key = {index}>
                                <td  className="products-id-data">{index + 1}</td>
                                <td className="thumbnails-td products-thumbnails-data"><img src={product.thumbnail} /></td>
                                <td className="products-name-data">{product.product_name}</td>
                                <td className="products-price-data">{product.price}</td>
                                <td className="products-1-data">{product.quantity}</td>
                                <td className="products-2-data">{product.quantity}</td>
                                <td className="descriptions-data">{product.description}</td>
                                <td className="order-type-data">{product.product_type === 1 ? "Mượn" : (product.product_type === 2 ? "Mua" : "Thuê")}</td>
                                <td className='products-update-data products-update-icon'><Link to= {`/admin/products/update/${product.product_id}`}><FaEdit /></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            
        </div>
        </Layout>

    )
}