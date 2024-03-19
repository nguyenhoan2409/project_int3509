import React from 'react'
import './ProductDisplay.css'
import start_icon from '~/Components/Assets/star_icon.png'
import start_dull_icon from '~/Components/Assets/star_dull_icon.png'

export const ProductDisplay = (props) => {
    const { product } = props;
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img src={product.image} alt="" />
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={start_icon} alt="" />
                    <img src={start_icon} alt="" />
                    <img src={start_icon} alt="" />
                    <img src={start_icon} alt="" />
                    <img src={start_dull_icon} alt="" />
                    <p>(122)</p>
                </div>

                <div className="productdisplay-right-prices">
                    ${product.price}
                </div>

                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>

                <button>ADD TO CART</button>
                <p className="productdisplay-right-category">
                    <span>Category: </span> Uniform, Jacket, Sport Set
                </p>
            </div>


        </div>
    )
}
