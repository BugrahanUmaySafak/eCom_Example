import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/stores/store';
import { setSelectedCategory, getAllProducts, getProductsByCategory } from '../redux/slices/productSlice';
import '../css/FilterSidebar.css';

const FilterSidebar: React.FC = () => {
        const dispatch: AppDispatch = useDispatch();
        const { categories, selectedCategory } = useSelector((state: RootState) => state.product);

        const handleCategoryClick = (category: string) => {
                dispatch(setSelectedCategory(category));
                if (category === 'All') {
                        dispatch(getAllProducts());
                } else {
                        dispatch(getProductsByCategory(category));
                }
        };

        return (
                <div className="filter-sidebar">
                        <h3>Filters</h3>
                        <hr />
                        <div className="filter-section">
                                <h4>Category</h4>
                                <ul>
                                        <li
                                                onClick={() => handleCategoryClick('All')}
                                                className={selectedCategory === 'All' ? 'selected' : ''}
                                        >
                                                All
                                        </li>
                                        {categories.map((category) => (
                                                <li
                                                        key={category}
                                                        onClick={() => handleCategoryClick(category)}
                                                        className={selectedCategory === category ? 'selected' : ''}
                                                >
                                                        {category}
                                                </li>
                                        ))}
                                </ul>
                        </div>
                </div>
        );
};

export default FilterSidebar;
