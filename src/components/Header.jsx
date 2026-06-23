import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart();
  return (
    <header className="bg-blue-200">
      <div  className="flex justify-between max-w-7xl mx-auto pt-5">
        <div className="h-15 w-15">
          <Link to="/">
            <img
              src="/public/ecommerce.svg"
              alt="logo"
              className="object-cover object-contain"
            />
          </Link>
        </div>
        <nav className="flex gap-10 font-semibold text-sm md:text-xl">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/services" className="hover:text-blue-500">
            Services
          </Link>
          <Link to="/contact" className="hover:text-blue-500">
            Contact
          </Link>
          <Link to="/cart">
            {" "}
            <span>
              <ShoppingCart className="w-6 h-6" />
              <sup className="-top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-white">
                {cart?.length ?? 0}
              </sup>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
