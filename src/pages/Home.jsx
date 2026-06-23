import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      <section className="max-w-7xl mx-auto ">
        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row items-center gap-12 px-6 py-30">
          {/* LEFT */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl md:text-6xl font-extrabold leading-tight">
              Find Everything You Need in One Place
            </h1>

            <p className="text-lg text-gray-600">
              Browse thousands of products across fashion, electronics, home
              essentials, and more. Enjoy the best deals with fast delivery and
              trusted quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg">
                Shop Now
              </button>

              <button className="px-6 py-3 border rounded-lg">Explore</button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex justify-center">
            <img
              src="/image.svg"
              alt="hero"
              className="w-full max-w-4xl h-auto"
            />
          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <section className="px-4 md:px-6 mx-auto pb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extralight">
            Our <span className="font-mono text-yellow-500">Products</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg mt-2 text-gray-600">
            Our platform carries the best quality products with 100% customer
            satisfaction.
          </p>

          {/* PRODUCT GRID */}
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white p-2 shadow hover:shadow-xl transition cursor-pointer w-40 flex flex-col"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-32 sm:h-36 md:h-36 w-full object-cover"
                />
                <h2 className="mt-3 text-sm md:text-base line-clamp-2">
                  {/* {item.title.slice(0, 20)}... */}
                  {item.title}
                </h2>
                <div className="mt-auto pt-2">
                  <p className="text-lg text-red-400/90">
                    ${item.price}
                    <span className="text-[13px] font-medium text-gray-500">
                      {" "}
                      -{item.discountPercentage}%
                    </span>
                  </p>
                </div>{" "}
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">
                    {"★".repeat(Math.floor(item.rating))}
                    {"☆".repeat(5 - Math.floor(item.rating))}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({item.rating.toFixed(1)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
