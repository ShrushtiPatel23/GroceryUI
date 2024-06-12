import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
    productList: [],
    cartItem: []
}

export const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            console.log(action)
            state.productList = [...action.payload]
        },
        addCartItem: (state, action) => {
            const check = state.cartItem.some(el => el._id === action.payload._id)
            console.log(check)
            if (check) {
                alert("already in cart")
            }
            else {
                const total = action.payload.price

                state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total: total }]
            }

        },
        deleteAllCartItem: (state, action) => {

            toast("Thank you! For Buying Item")
            state.cartItem = [] 
            console.log(state.cartItem)
        },

        deleteCartItem: (state, action) => {
            console.log(action.payload)
            toast("Item is deleted")
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            state.cartItem.splice(index, 1)
            console.log(index)
        },
        increaseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            var qty = state.cartItem[index].qty
            state.cartItem[index].qty = ++qty
            var price = state.cartItem[index].price
            state.cartItem[index].total = qty * price
        },
        decreseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            var qty = state.cartItem[index].qty
            if (qty > 1) {
                state.cartItem[index].qty = --qty
                var price = state.cartItem[index].price
                state.cartItem[index].total = qty * price
            }
        }
    }

})

export const { setDataProduct, addCartItem, deleteAllCartItem, deleteCartItem, increaseQty, decreseQty } = ProductSlice.actions

export default ProductSlice.reducer;