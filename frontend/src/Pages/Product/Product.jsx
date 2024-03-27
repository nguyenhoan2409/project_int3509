import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Navbar } from '~/Components/Navbar/Navbar';
import { ProductDisplay } from '~/Components/ProductDisplay/ProductDisplay';
import { ShopContext } from '~/Context/ShopContext'

export const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId))
  return (
    <div>
      
      <ProductDisplay product={product}/>
    </div>
  )
}
