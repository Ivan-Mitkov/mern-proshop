import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "../constants/orderConsts";

export const orderReducer = (
  state = {  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_SUCCESS:
      
      return{
        loading:false,
        success:true,
        order:payload,
        error:''
      }

    case ORDER_CREATE_FAIL:
      return{
        loading:false,
        success:false,
        order:null,
        error:payload
      }
    case ORDER_CREATE_REQUEST:
      return{
        loading:true,
        error:'',
        order:null,
        success:false
      }

    default:
      return state;
  }
};
