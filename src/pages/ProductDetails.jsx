import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increment = () => {
    if (product && num < product.stock) {
      setNum(num + 1);
    }
  };

  const decrement = () => {
    if (num > 1) setNum(num - 1);
  };

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading product details...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center py-10 text-red-500">
        Product not found
      </p>
    );
  }

 const handleBuyNow = (ItemsId) => {
  if (!product) return;

  // 1. Format the product to match the data structure your checkout page expects
  const checkoutItem = {
    id: product.id,
    title: product.title,
    thumbnail: product.images?.[0] || '', // map fallback safely
    price: product.price,
    quantity: num, // use the current state-controlled counter
  };

  // 2. Perform dynamic financial calculations for this specific purchase
  const baseAmount = product.price * num;
  const discountAmount = Number((baseAmount * 0.1).toFixed(2));
  const amountAfterDiscount = baseAmount - discountAmount;
  const vatAmount = Number((amountAfterDiscount * 0.13).toFixed(2));
  const totalPayable = Number((amountAfterDiscount + vatAmount).toFixed(2));

  // 3. Navigate directly to the payment page, bypassing the cart
  navigate("/payment", {
    state: {
      checkoutItems: [checkoutItem], // Wrapped in an array to keep payment page happy
      totalPayable: totalPayable,
    },
  });
};

  return (
    <section className="bg-gray-100 pt-10 pb-10">

      {/* MAIN DETAILS */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 bg-white flex flex-col md:flex-row gap-10 py-10">

        {/* LEFT */}
        <div className="md:w-1/2 flex flex-col gap-4">

          <img
            src={product?.images?.[0]}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg"
          />

          {product.qrCode && (
            <div className="flex items-center gap-4">
              <img src={product.qrCode} alt="QR Code" className="w-24 h-24" />
              <p className="text-sm text-gray-500">
                Barcode: {product.barcode}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="md:w-1/2 space-y-3">

          <h1 className="text-lg md:text-xl font-semibold">
            {product.title}
          </h1>

          <p className="text-gray-600">
            {product.description}
          </p>

          {/* RATING */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>
                {i < Math.round(product.rating) ? "⭐" : "☆"}
              </span>
            ))}
          </div>

          <hr />

          <p className="text-2xl uppercase font-semibold text-red-400">
            {product.category}
          </p>

          {/* PRICE */}
          <div>
            <p className="text-gray-400 line-through">
              $
              {(
                product.price +
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
            </p>

            <p className="text-red-500 font-semibold text-lg md:text-2xl">
              ${product.price}
            </p>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded uppercase text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-gray-100 w-fit px-3 py-1">
            In Stock: {product.stock}
          </div>

          <hr />

          {/* QUANTITY */}
          <p>Quantity</p>

          <div className="flex gap-2 items-center">
            <button
              className="bg-gray-100 w-10 h-10"
              onClick={decrement}
            >
              -
            </button>

            <span className="w-10 text-center">{num}</span>

            <button
              className="bg-gray-100 w-10 h-10"
              onClick={increment}
            >
              +
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-5 mt-8">
            <button className="px-5 py-2 bg-blue-300 hover:bg-blue-400"
            onClick={()=>handleBuyNow(product.id)}
            >
              Buy Now
            </button>

            <button
              className="px-5 py-2 bg-amber-400 hover:bg-amber-500"
              onClick={() => addToCart(product, num)}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 bg-white py-10 mt-8">
        <h1 className="text-xl mb-2">Description</h1>
        <p>{product.description}</p>

        <hr className="mt-4" />

        <h2 className="uppercase font-medium mt-4">Specifications</h2>

        <div className="flex justify-between mt-4 gap-10 flex-col md:flex-row">

          <div>
            <p className="text-gray-500 font-semibold">Brand</p>
            <p>{product.brand}</p>

            <p className="text-gray-500 font-semibold mt-2">Category</p>
            <p>{product.category}</p>

            <p className="text-gray-500 font-semibold mt-2">Tags</p>
            <p>{product.tags?.join(", ")}</p>

            <p className="text-gray-500 font-semibold mt-2">Return Policy</p>
            <p>{product.returnPolicy}</p>
          </div>

          <div>
            <p className="text-gray-500 font-semibold">SKU</p>
            <p>{product.sku}</p>

            <p className="text-gray-500 font-semibold mt-2">Warranty</p>
            <p>{product.warrantyInformation}</p>

            <p className="text-gray-500 font-semibold mt-2">
              Shipping Information
            </p>
            <p>{product.shippingInformation}</p>

            <p className="text-gray-500 font-semibold mt-2">Stock</p>
            <p>{product.stock}</p>
          </div>

        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 bg-white py-10 mt-8">

        <h1 className="text-xl mb-4">
          Reviews and Ratings of {product.title}
        </h1>

        {/* AVERAGE RATING */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-4xl font-semibold text-gray-700">
            {product.rating?.toFixed(1)}
            <span className="text-lg text-gray-500">/5</span>
          </span>

          <span className="text-yellow-500 text-2xl">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </span>
        </div>

        {/* REVIEWS LIST */}
        <div className="space-y-4">
          {product.reviews?.map((review, idx) => (
            <div key={idx} className="border-b pb-3">

              <div className="flex justify-between">

                <div>
                  <p className="text-yellow-500">
                    {"★".repeat(Math.floor(review.rating))}
                    {"☆".repeat(5 - Math.floor(review.rating))}
                  </p>

                  <p className="text-sm text-gray-500">
                    {review.reviewerName} | {review.reviewerEmail}
                  </p>
                </div>

                <p className="text-xs text-gray-400">
                  {review.date &&
                    new Date(review.date).toDateString()}
                </p>
              </div>

              <p className="mt-2 text-gray-700">{review.comment}</p>

            </div>
          ))}
        </div>

      </section>

    </section>
  );
};

export default ProductDetails;