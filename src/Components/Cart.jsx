import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../rtk/store';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate the total price
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  return (
    <div className="container mx-auto mt-20 p-4 min-h-svh">
      <h2 className="text-3xl font-bold text-primary mb-8">Cart</h2>
      {cart.length > 0 ? (
        <div>
          <div className="space-y-4">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-gray-600">${product.price}</p>
                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                    <p className="text-gray-600">Total: ${product.price * product.quantity}</p>
                  </div>
                </div>
                <button
                  className="text-red-600 border border-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8 p-4 border-t border-gray-300">
            <h3 className="text-xl font-bold text-primary">Total Price: ${totalPrice.toFixed(2)}</h3>
            <button
              className="inline text-red-600 border border-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
              onClick={handleClearCart}
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

    </div>
  );
};

export default Cart;
