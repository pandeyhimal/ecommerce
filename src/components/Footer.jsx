import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800">

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-500">
            E-Commerce
          </h2>
          <p className="text-sm">
            Your trusted ecommerce platform for quality products, best prices, and fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-500">About</Link></li>
            <li><Link to="/services" className="hover:text-yellow-500">Services</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-500">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2 text-gray-700">
            <li>FAQ</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Email: support@shopmate.com</li>
            <li>Phone: +977-9800000000</li>
            <li>Location: Kathmandu, Nepal</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} ShopMate. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;