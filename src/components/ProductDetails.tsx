import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/stores/store';
import { useParams } from 'react-router-dom';
import { getAllProducts, setSelectedProduct } from '../redux/slices/productSlice';
import CommonState from './CommonState';
import '../css/ProductDetails.css';

const ProductDetails: React.FC = () => {
        const { id } = useParams<{ id: string }>();
        const dispatch: AppDispatch = useDispatch();
        const { products, status, error, selectedProduct } = useSelector((state: RootState) => state.product);

        useEffect(() => {
                if (status === 'idle') {
                        dispatch(getAllProducts());
                }
        }, [dispatch, status]);

        useEffect(() => {
                if (status === 'succeeded') {
                        const product = products.find((product) => product.id === Number(id));
                        dispatch(setSelectedProduct(product || null));
                }
        }, [dispatch, status, id, products]);

        const product = selectedProduct;

        return (
                <div className="details-container">
                        <CommonState loading={status === 'loading'} error={error || (status === 'failed' ? 'Product not found' : null)} />
                        {status === 'succeeded' && product && (
                                <div className="product-details">
                                        <img className="product-image" src={product.image} alt={product.title} />
                                        <div className="product-info">
                                                <h2 className="product-title">{product.title}</h2>
                                                <p className="product-description">{product.description}</p>
                                                <p className="product-price">${product.price}</p>
                                                <button className='add-basket-btn'>Add to Basket</button>
                                        </div>
                                </div>
                        )}
                </div>
        );
};

export default ProductDetails;
