import axios from "axios";
import {
  CART_REMOVE_ITEM,
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
} from "../constants/cartConsts";

const saveToLocalStorage = (getState) => {
  //get from state entire cart with getState()
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  //save in local storage
  //get from state entire cart with getState()
  saveToLocalStorage(getState);
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  saveToLocalStorage(getState);
};
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
export const confirmPayment = () => (dispatch) => {
  dispatch({
    type: CART_RESET,
  });
  localStorage.removeItem("cartItems");
};
