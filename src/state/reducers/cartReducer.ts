import { stat } from "fs/promises";
import { CartItem } from "../../interfaces";
import { Action, ActionType } from "../types";

const initialState: { cartItems: CartItem[] } = { cartItems: [] };

export const cartReducer = (
  state: { cartItems: CartItem[] } = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { product: action.payload, quantity: 1 },
        ],
      };
    case ActionType.INCREMENT_CART_ITEM:
      return state;
    case ActionType.DECREMENT_CART_ITEM:
      return state;

    default:
      return state;
  }
};
