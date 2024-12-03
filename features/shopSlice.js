import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart: [],
};

export const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        addCart: (state, { payload }) => {
            const isCartExist = state.cart.some(
                (item) => item.id === payload.product.id
            );
            
            // Check if product has stock quantity and if it's available
            if (payload.product.stock_quantity !== null && payload.product.stock_quantity <= 0) {
                toast.error("This item is out of stock.");
                return;
            }

            if (!isCartExist) {
                // Check if requested quantity is available
                const requestedQty = payload?.qty || 1;
                if (payload.product.stock_quantity !== null && requestedQty > payload.product.stock_quantity) {
                    toast.error(`Only ${payload.product.stock_quantity} items available in stock`);
                    return;
                }

                state.cart.push({
                    ...payload.product,
                    qty: requestedQty,
                });
                toast.success("This item added to cart.");
            } else {
                toast.error("This item is already in the cart.");
            }
            localStorage.setItem("local-cart", JSON.stringify(state.cart));
        },
        deleteCart: (state, { payload }) => {
            state.cart = state.cart.filter((item) => item.id !== payload);
            localStorage.setItem("local-cart", JSON.stringify(state.cart));
            toast.error(`Item ${payload} has been deleted.`);
        },
        addQty: (state, { payload }) => {
            state.cart = state.cart.filter((item) => {
                if (item.id === payload.id) {
                    item.qty = payload.qty;
                }
                return item;
            });
            localStorage.setItem("local-cart", JSON.stringify(state.cart));
        },
        reloadCart: (state, { payload }) => {
            const cart = JSON.parse(localStorage.getItem("local-cart"));
            if (cart) {
                state.cart = cart;
            }
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.removeItem("local-cart"); // Also clear localStorage
        },
    },
});

export const { addCart, deleteCart, addQty, reloadCart, clearCart } = shopSlice.actions;
export default shopSlice.reducer;
