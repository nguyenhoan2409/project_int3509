import React, { useContext } from 'react'
import './ShopCategory.css'
import { Item } from './../../Components/Item/Item'
import image from '../../Components/Assets/banner_uniform.png'
import productList from "./../../Components/Assets/all_product"
import { Navbar } from '~/Components/Navbar/Navbar'
import { Footer } from '~/Components/Footer/Footer'

export const ShopCategory = () => {

  return (
    <div className="shop-category">
      <Navbar />
       <img className='shopcategory-banner' src={image} />
      <div className="shopcategory-products">
        {productList.map(product => (
          <Item key={product.id} image={product.image} name={product.name} order={product.order} />)

        )}
      </div>
      <Footer />
    </div>

  )
}