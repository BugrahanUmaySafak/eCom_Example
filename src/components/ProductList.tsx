import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/stores/store';
import { getAllProducts } from '../redux/slices/productSlice';
import CommonState from './CommonState';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/ProductList.css';

const ProductList: React.FC = () => {
        const dispatch: AppDispatch = useDispatch();
        const navigate = useNavigate();
        const location = useLocation();
        const { filteredProducts, status, error } = useSelector((state: RootState) => state.product);

        useEffect(() => {
                if (location.pathname === '/') {
                        if (status === 'idle') {
                                dispatch(getAllProducts());
                        }
                }
        }, [dispatch, status, location.pathname]);

        const handleDetailsClick = (productId: number) => {
                navigate(`/product-details/${productId}`);
        };

        return (
                <div className="container product-list">
                        <CommonState loading={status === 'loading'} error={error || null} />
                        {status === 'succeeded' && (
                                <div className="row row-cols-1 row-cols-md-3 g-4">
                                        {filteredProducts.map((product) => (
                                                <div key={product.id} className="col mb-4">
                                                        <div className="card h-100">
                                                                <img src={product.image} className="card-img-top" alt={product.title} />
                                                                <div className="card-body d-flex flex-column">
                                                                        <h5 className="card-title">{product.title}</h5>
                                                                        <p className="card-text">Price: ${product.price}</p>
                                                                        <button
                                                                                className="btn btn-primary mt-auto"
                                                                                onClick={() => handleDetailsClick(product.id)}
                                                                        >
                                                                                Details
                                                                        </button>
                                                                </div>
                                                        </div>
                                                </div>
                                        ))}
                                </div>
                        )}
                </div>
        );
};

export default ProductList;
