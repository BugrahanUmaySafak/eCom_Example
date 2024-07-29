import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import ProductDetails from '../components/ProductDetails';
import Login from '../components/Login';
import Register from '../components/Register';

const RouterConfig: React.FC = () => {
        return (
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/product-details/:id" element={<ProductDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                </Routes>
        );
};

export default RouterConfig;
