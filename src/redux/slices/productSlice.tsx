import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../stores/store';

interface Rating {
        rate: number;
        count: number;
}

export interface Product {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
        rating: Rating;
}

export interface CommonState {
        status: 'idle' | 'loading' | 'succeeded' | 'failed';
        error: string | null;
}

const initialCommonState: CommonState = {
        status: 'idle',
        error: null,
};

export interface ProductState extends CommonState {
        products: Product[];
        filteredProducts: Product[];
        selectedProduct: Product | null;
        categories: string[];
        selectedCategory: string;
}

const initialState: ProductState = {
        ...initialCommonState,
        products: [],
        filteredProducts: [],
        selectedProduct: null,
        categories: ["electronics", "jewelery", "men's clothing", "women's clothing"],
        selectedCategory: 'All',
};

const BASE_URL = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
        "product/getAllProducts",
        async (_, { rejectWithValue }) => {
                try {
                        const response = await axios.get(`${BASE_URL}/products`);
                        return response.data as Product[];
                } catch (error) {
                        return rejectWithValue('Failed to fetch products');
                }
        }
);

export const getProductsByCategory = createAsyncThunk<Product[], string, { rejectValue: string }>(
        "product/getProductsByCategory",
        async (category, { rejectWithValue }) => {
                try {
                        const response = await axios.get(`${BASE_URL}/products/category/${category}`);
                        return response.data as Product[];
                } catch (error) {
                        return rejectWithValue('Failed to fetch products by category');
                }
        }
);

export const searchProducts = createAsyncThunk<Product[], string, { rejectValue: string }>(
        "product/searchProducts",
        async (query, { getState, rejectWithValue }) => {
                try {
                        const { products }: { products: Product[] } = (getState() as RootState).product;
                        const filteredProducts = products.filter(product =>
                                product.title.toLowerCase().includes(query.toLowerCase())
                        );
                        return filteredProducts;
                } catch (error) {
                        return rejectWithValue('Failed to search products');
                }
        }
);

const productSlice = createSlice({
        name: 'product',
        initialState,
        reducers: {
                setSelectedCategory: (state, action: PayloadAction<string>) => {
                        state.selectedCategory = action.payload;
                },
                setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
                        state.selectedProduct = action.payload;
                }
        },
        extraReducers: (builder) => {
                builder
                        .addCase(getAllProducts.pending, (state) => {
                                state.status = 'loading';
                        })
                        .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                                state.status = 'succeeded';
                                state.products = action.payload;
                                state.filteredProducts = action.payload;
                        })
                        .addCase(getAllProducts.rejected, (state, action) => {
                                state.status = 'failed';
                                state.error = action.payload || 'Failed to fetch products';
                        })
                        .addCase(getProductsByCategory.pending, (state) => {
                                state.status = 'loading';
                        })
                        .addCase(getProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
                                state.status = 'succeeded';
                                state.filteredProducts = action.payload;
                        })
                        .addCase(getProductsByCategory.rejected, (state, action) => {
                                state.status = 'failed';
                                state.error = action.payload || 'Failed to fetch products by category';
                        })
                        .addCase(searchProducts.pending, (state) => {
                                state.status = 'loading';
                        })
                        .addCase(searchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                                state.status = 'succeeded';
                                state.filteredProducts = action.payload;
                        })
                        .addCase(searchProducts.rejected, (state, action) => {
                                state.status = 'failed';
                                state.error = action.payload || 'Failed to search products';
                        });
        }
});

export const { setSelectedCategory, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
