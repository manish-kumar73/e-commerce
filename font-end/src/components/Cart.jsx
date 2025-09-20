import React from "react";
import { useSelector, useDispatch,  } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlise"; 
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to proceed to checkout.");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-lg text-gray-600 mt-4">Your cart is empty.</p>
            <Link
              to="/home"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 text-xs">
            {/* Cart Items */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4 ">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-center font-semibold">Price</th>
                      <th className="text-center font-semibold">Quantity</th>
                      <th className="text-center font-semibold">Total</th>
                      <th className="text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center leading-8">
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center flex-col text-xs md:text-xl md:flex-row">
                            <img
                              className="h-16 w-16 mr-4 rounded"
                              src={item.thumbnail}
                              alt={item.title}
                            />
                            <span className="font-semibold">{item.title}</span>
                          </div>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <div className="flex items-center md:ml-28 ">
                            <button
                              onClick={() => dispatch(decreaseQuantity(item))}
                              className="text-2xl bold text-red-600 px-[10px] cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-center text-3xl text-bold w-8">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(increaseQuantity(item))}
                              className="text-2xl bold text-green-600 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          {/* <br />
                          <br />
                          <br /> */}
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
               {/* Clear Cart Button */}
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Clear Cart
                </button>

                {/* Checkout Button */}
            </div>

            {/* Order Summary */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-4 bg-blue-600 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
