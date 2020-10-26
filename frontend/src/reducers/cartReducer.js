import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConsts";

export const cartReducer = (state = { cartItems: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;
      const existItem = state.cartItems.find((c) => c.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((c) => {
            if (c.product === existItem.product) {
              return item;
            }
            return c;
          }),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems].filter((c) => c.product !== payload),
      };

    default:
      return state;
  }
};
