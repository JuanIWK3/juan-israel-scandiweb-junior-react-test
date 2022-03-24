import { Dispatch } from "redux";
import { Product, SelectedAttribute } from "../../interfaces";
import { State } from "../reducers";
import { ActionType } from "../types";

export const mapStateToProps = (state: State) => {
  return {
    currencyIndex: state.currency,
    cart: state.cart,
    categoryIndex: state.category,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeCurrency: (currencyIndex: number) => {
      dispatch({ type: ActionType.CHANGE_CURRENCY, payload: currencyIndex });
    },
    changeCategory: (categoryIndex: number) => {
      dispatch({ type: ActionType.CHANGE_CATEGORY, payload: categoryIndex });
    },
    addCartItem: (product: Product, attributes?: SelectedAttribute[]) => {
      dispatch({
        type: ActionType.ADD_CART_ITEM,
        payload: { product: product, attributes: attributes },
      });
    },
    incrementCartItem: (index: number) => {
      dispatch({ type: ActionType.INCREMENT_CART_ITEM, payload: index });
    },
    decrementCartItem: (index: number) => {
      dispatch({ type: ActionType.DECREMENT_CART_ITEM, payload: index });
    },
  };
};
