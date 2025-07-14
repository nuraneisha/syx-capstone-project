import Dashbord from "./pages/Dashboard"
import Products from "./pages/Products"
import Tops from "./pages/Tops"
import Bottom from "./pages/Bottom"
import Apparel from "./pages/Apparel"
import About from "./pages/About"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OurWay from "./pages/OurWay"
import Location from "./pages/Location";
import Store from "./pages/Store";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashbord />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/Tops" element={<Tops />} />
          <Route path="/products/Bottoms" element={<Bottom />} />
          <Route path="/products/Apparel" element={<Apparel />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/ourWay" element={<OurWay />} />
          <Route path="/location" element={<Location />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}