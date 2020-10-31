import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConsts";

export const orderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
        error: "",
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        order: null,
        error: payload,
      };
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
        error: "",
        order: null,
        success: false,
      };

    default:
      return state;
  }
};
export const orderDetailsReducer = (
  state = {loading:true, orderItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: payload,
        error: "",
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        order: null,
        error: payload,
      };
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    default:
      return state;
  }
};
