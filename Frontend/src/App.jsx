import { ModalContext } from "./context/ModalProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import About from "./pages/About"
import Apparel from "./pages/Apparel"
import Bottom from "./pages/Bottom"
import OurWay from "./pages/OurWay"
import Location from "./pages/Location"
import Store from "./pages/Store"
import Tops from "./pages/Tops"
import Card from "./pages/Cards";
import { AuthProvider } from "./context/AuthProvider";
import ShoppingCart from "./pages/ShoppingCart";


export default function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/Tops" element={<Tops />} />
                    <Route path="/products/Bottoms" element={<Bottom />} />
                    <Route path="/products/Apparel" element={<Apparel />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/ourWay" element={<OurWay />} />
                    <Route path="/location" element={<Location />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/card/:id" element={<Card />} />
                    <Route path="/shopping" element={<ShoppingCart />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
