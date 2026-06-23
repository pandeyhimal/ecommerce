import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Contact from "./pages/Contact"
import ProductDetails from "./pages/ProductDetails"
import AddToCart from "./pages/AddToCart"
import Footer from "./components/Footer"
import { CartProvider } from "./context/CartContext";
import Payment from "./pages/Payment"

function App() {

  return (
    <CartProvider>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<AddToCart/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      </CartProvider>
  )
}

export default App
