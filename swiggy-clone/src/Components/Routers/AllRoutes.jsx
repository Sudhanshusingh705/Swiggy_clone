import { Route, Routes } from "react-router-dom";
import { MyAccount } from "../Account/MyAccount";
import { OrderStatus } from "../Account/OrderStatus";
import { Checkout } from "../Checkout/Checkout";
import { Footer } from "../Footer/Footer";
import { Landing } from "../Landing/Landing";
import { Restaurant } from "../Restaurants/Restaurant";
import { Restaurants } from "../Restaurants/Restaurants";

export const AllRoutes = () => {
    return (
        <>
        <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/city/:name" element={<Restaurants />} />
            <Route exact path="/restaurants/:id" element={<Restaurant />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/my-account" element={<MyAccount />} />
            <Route exact path="/order-status" element={<OrderStatus />} />
        </Routes>
        <Footer />
        </>
    );
};