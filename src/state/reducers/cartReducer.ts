import { CartItem, Product, SelectedAttribute } from "../../interfaces";
import { Action, ActionType } from "../types";

const initialState: { cartItems: CartItem[] } = { cartItems: [] };

export const cartReducer = (
  state: { cartItems: CartItem[] } = initialState,
  action: Action
) => {
  const setAttributes = (
    product: Product,
    selectedAttrs: SelectedAttribute[] | undefined
  ) => {
    const selectedAttributes: SelectedAttribute[] = [];

    if (selectedAttrs) {
      for (let i = 0; i < product.attributes.length; i++) {
        selectedAttributes.push({
          attribute: selectedAttrs[i].attribute,
          item: selectedAttrs[i].item,
        });
      }
    } else {
      for (let i = 0; i < product.attributes.length; i++) {
        selectedAttributes.push({
          attribute: 1,
          item: 1,
        });
      }
    }

    return selectedAttributes;
  };

  switch (action.type) {
    case ActionType.ADD_CART_ITEM:
      //* If the item already exists
      for (let i = 0; i < state.cartItems.length; i++) {
        if (
          state.cartItems[i].product === action.payload.product &&
          state.cartItems[i].selectedAttributes === action.payload.attributes
        ) {
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
          {
            product: action.payload.product,
            quantity: 1,
            selectedAttributes: setAttributes(
              action.payload.product,
              action.payload.attributes
            ),
          },
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
