import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL
} from "../constants/orderConsts";
import axios from 'axios';


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    //add token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);
    // console.log('actions data:',data)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  
    //save updated order in local storage
    localStorage.setItem("order", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    //get user for private route
    const {
      userLogin: { userInfo },
    } = getState();
    //add token
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //get orders of this user
    const { data } = await axios.get(`/api/orders/${id}`, config);
    // console.log('actions data:',data)
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  
    //save updated order in local storage
    // localStorage.setItem("order", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


