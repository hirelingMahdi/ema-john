import React from 'react';
import { useNavigate } from 'react-router';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import useCart from '../Hook/useCart';
import useProducts from '../Hook/useProducts';
import ReviewItem from '../ReviewItem/ReviewItem';




const OrderReview = () => {
    const [products] = useProducts();
   const [cart, setCart ] = useCart(products);
   const handleRemove = key => {
       const newCart = cart.filter(product => product.key !== key);
       setCart(newCart);
       removeFromDb(key);                                                                                     
   }
   let navigate = useNavigate();
   const handlePlaceOrder = () => {
    navigate("/shipping");
    /* setCart([]);
    clearTheCart(); */
   }
   
    return (
        <div className = "shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem key = {product.key} product = { product }  handleRemove = { handleRemove } ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart = { cart } >
                    <button onClick = { handlePlaceOrder } className = "regular-btn">Procced to shipping</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;