import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  wishlist:[],
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    add_to_wishlist:(state,{payload}) => {
      console.log(payload)
      const productIndex = state?.wishlist?.findIndex(item => item.id === payload.id);
      if(productIndex >= 0){
        toast.error(`${payload.product_name} already added to wishlist`, {
          position: 'top-left'
        })
      }
      else {
        state?.wishlist?.push(payload);
        toast.success(`${payload?.product_name} added to wishlist`, {
          position: 'top-left'
        })
      }
    },
    remove_wishlist_product:(state,{payload}) => {
      state.wishlist = state.wishlist.filter(item => item.id !== payload.id);
      toast.error(`remove from your wishlist`, {
        position: 'top-left'
      })
    }
  },
})

export const { add_to_wishlist,remove_wishlist_product } = wishlistSlice.actions;

export const wishlistItems = (state) => state.wishlist.wishlist;
console.log(wishlistItems)

export default wishlistSlice.reducer