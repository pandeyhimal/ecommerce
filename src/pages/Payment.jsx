import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the state sent via navigate()
  const { checkoutItems, totalPayable } = location.state || {};

  // Guard clause: If someone navigates directly to /payment without items
  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="text-xl text-gray-500 mb-4">
          No items selected for payment.
        </p>
        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Secure Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Order Review */}
        <div className="border p-6 rounded-xl bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Review Your Order
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {checkoutItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center justify-between"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} x ${item.price}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between items-center text-lg font-bold">
            <div className="flex flex-col">
              <span>Total to Pay:</span>
              <span className="text-xs font-normal text-gray-500">
                With 13% VAT
              </span>
            </div>

            <span className="text-green-600">${totalPayable.toFixed(2)}</span>
          </div>
        </div>

        {/* Right Side: Payment Gateway Form */}
        <div className="border p-6 rounded-xl bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          {/* Integrate your Stripe, PayPal, or mock form here */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Card Details
              </label>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded"
              />
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
              Pay Now (${totalPayable.toFixed(2)})
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
