import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
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
  state = {
    loading: true,
    orderItems: [],
    shippingAddress: {},
    confirmed: false,
  },
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
    case ORDER_PAY_RESET:
      return {
        ...state,
        orderItems: [],
      };
    default:
      return state;
  }
};
export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_MY_LIST_SUCCESS:
      return {
        loading: false,
        orders: payload,
        error: "",
      };

    case ORDER_MY_LIST_FAIL:
      return {
        loading: false,
        orders: [],
        error: payload,
      };
    case ORDER_MY_LIST_REQUEST:
      return {
        orders: [],
        loading: true,
        error: "",
      };

    default:
      return state;
  }
};
