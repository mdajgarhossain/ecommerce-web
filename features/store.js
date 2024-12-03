import { configureStore } from "@reduxjs/toolkit"
import filterSlice from "./filterSlice"
import productSlice from "./productSlice"
import shopSlice from "./shopSlice"
import wishlistSlice from "./wishlistSlice"
import categorySlice from "./categorySlice"
import authSlice from "./authSlice"
import orderSlice from "./orderSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        filter: filterSlice,
        shop: shopSlice,
        wishlist: wishlistSlice,
        categories: categorySlice,
        orders: orderSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})
