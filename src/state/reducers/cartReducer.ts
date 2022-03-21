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
      //* If the item already exists
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].product.id === action.payload.id) {
          const incrementedArray = [...state.cartItems];
          incrementedArray[i].quantity++;

          return { ...state, cartItems: incrementedArray };
        }
      }
      //* New item
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { product: action.payload, quantity: 1 },
        ],
      };

    case ActionType.INCREMENT_CART_ITEM:
      const incrementedArray = [...state.cartItems];
      incrementedArray[action.payload].quantity++;

      return { ...state, cartItems: incrementedArray };

    case ActionType.DECREMENT_CART_ITEM:
      //* Delete item
      if (state.cartItems[action.payload].quantity === 1) {
        const splicedArray = [...state.cartItems];
        splicedArray.splice(action.payload, 1);

        return { ...state, cartItems: splicedArray };
      }

      //* Decrement quantity
      const decrementedArray = [...state.cartItems];
      decrementedArray[action.payload].quantity--;

      return { ...state, cartItems: decrementedArray };

    default:
      return state;
  }
};
