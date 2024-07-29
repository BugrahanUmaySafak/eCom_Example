import React from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../components/ProductList';
import '../css/Home.css';

const Home: React.FC = () => {
        return (
                <div className="home-page">
                        <FilterSidebar />
                        <ProductList />
                </div>
        );
}

export default Home;
