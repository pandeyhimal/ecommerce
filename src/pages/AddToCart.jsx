import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-10 text-xl text-gray-500 text-center">
        Your cart is empty!
      </div>
    );
  }

  // --- DYNAMIC CALCULATIONS ---

  
  const selectedProducts = cart.filter((item) =>
  selectedItems.includes(item.id)
);

  // 1. Sum up all quantities (e.g., 2 shirts + 1 hat = 3 items total)
  const totalItems = selectedProducts.reduce((sum, item) => sum + item.quantity, 0);

  // 2. Sum up the base price total (Item Price * Quantity)
  const totalAmount = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity,0,);

  // 3. Fake a 10% discount for UI representation
  const discountAmount = Number((totalAmount * 0.1).toFixed(2));

  // 4. Calculate 13% VAT based on the amount AFTER discount
  const amountAfterDiscount = totalAmount - discountAmount;
  const vatAmount = Number((amountAfterDiscount * 0.13).toFixed(2));

  // 5. Final payable amount
  const totalPayable = Number((amountAfterDiscount + vatAmount).toFixed(2));

const handleCheckout = (itemId) => {
  setSelectedItems((prev) =>
    prev.includes(itemId)? prev.filter((id) => id !== itemId) // uncheck
      : [...prev, itemId] // check
  );
};

 // 1. For a single item click ("Order Now")
const handleOrder = (id) => {
  // Find the exact item from the cart
  const singleItem = cart.find((item) => item.id === id);
  if (!singleItem) return;

  // Calculate specific totals for just this one item
  const baseAmount = singleItem.price * singleItem.quantity;
  const discount = Number((baseAmount * 0.1).toFixed(2));
  const vat = Number(((baseAmount - discount) * 0.13).toFixed(2));
  const payable = Number((baseAmount - discount + vat).toFixed(2));

  // Navigate to the single payment page, passing data in state
  navigate("/payment", {
    state: {
      checkoutItems: [singleItem], // Wrapped in an array so the payment page always expects an array
      totalPayable: payable,
    },
  });
};

// 2. For multi-item summary click ("Proceed to Checkout")
const handleCheckoutAll = () => {
  if (selectedItems.length === 0) {
    alert("Please select at least one item to checkout.");
    return;
  }

  // Navigate passing the dynamically filtered selectedProducts and totalPayable
  navigate("/payment", {
    state: {
      checkoutItems: selectedProducts, // Array of selected items
      totalPayable: totalPayable,      // Total calculated amount
    },
  });
};

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border p-4 flex gap-6 items-center justify-between rounded-lg shadow-sm bg-white"
            >
              <div className="flex gap-4 items-center">
                <input type="checkbox" id="item" value={item.title} className="relative top-0 left-0 bottom-0 h-8 w-4 "
                checked={selectedItems.includes(item.id)}
               onChange={() => handleCheckout(item.id)}
                />
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-green-600 font-medium">
                    Price: ${item.price}
                  </p>
                  <p className="text-base font-bold mt-1">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Individual Item Actions */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => handleOrder(item.id)}
                  className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-blue-700 transition"
                >
                  Order Now
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="border border-red-500 text-red-500 px-4 py-2 text-sm font-semibold rounded hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary Dashboard Card */}
        <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-6">
          <h2 className="text-xl font-bold text-center mb-6 border-b pb-3 border-gray-300">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm md:text-base text-gray-700">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-semibold">${totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-red-600">
              <span>Discount Amount (10%):</span>
              <span className="font-semibold">
                -${discountAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>VAT (13%):</span>
              <span className="font-semibold">${vatAmount.toFixed(2)}</span>
            </div>

            <hr className="border-gray-300 my-4" />

            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total Payable:</span>
              <span>${totalPayable.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick= {handleCheckoutAll}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-bold tracking-wide shadow hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
