import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  CLEAR_USER_DETAILS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_SUCCESS,
  USER_UPDATE_ADMIN_RESET,
} from "../constants/userConsts";

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: payload,
        error: "",
        loading: false,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: payload,
        error: "",
        loading: false,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
export const userDetailReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        user: null,
        error: "",
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: payload,
        error: "",
        loading: false,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        user: null,
        error: payload,
        loading: false,
      };
    case CLEAR_USER_DETAILS:
      return {};
    default:
      return state;
  }
};
export const userUpdateDetailReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        userInfo: null,
        success: false,
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        userInfo: payload,
        success: true,
        error: "",
        loading: false,
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
        userInfo: null,
        error: payload,
        success: false,
        loading: false,
      };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const userListReducer = (
  state = { users: [], loading: true, error: "" },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        users: payload,
        loading: false,
      };
    case USER_LIST_FAIL:
      return {
        users: [],
        error: payload,
        loading: false,
      };
    case USER_LIST_RESET:
      return {
        users: [],
      };

    default:
      return state;
  }
};
export const userDeleteReducer = (state = { success: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DELETE_REQUEST:
      return {
        success: false,
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case USER_DELETE_FAIL:
      return {
        success: false,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
export const userUpdateReducer = (state = { user:{} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_ADMIN_REQUEST:
      return {
        success: false,
        loading: true,
      };
    case USER_UPDATE_ADMIN_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case USER_UPDATE_ADMIN_FAIL:
      return {
        success: false,
        error: payload,
        loading: false,
      };
      case USER_UPDATE_ADMIN_RESET:
        return{user:{}}
    default:
      return state;
  }
};
