import { Dispatch } from "redux";
import { IProduct } from "../../interfaces";
import { State } from "../reducers";
import { ActionType } from "../types";

export const mapStateToProps = (state: State) => {
  return { currencyIndex: state.currency, cart: state.cart };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeCurrency: (currencyIndex: number) => {
      dispatch({ type: ActionType.CHANGE_CURRENCY, payload: currencyIndex });
    },
    addCartItem: (product: IProduct) => {
      dispatch({ type: ActionType.ADD_CART_ITEM, payload: product });
    },
    incrementCartItem: (index: number) => {
      dispatch({ type: ActionType.INCREMENT_CART_ITEM, payload: index });
    },
    decrementCartItem: (index: number) => {
      dispatch({ type: ActionType.DECREMENT_CART_ITEM, payload: index });
    },
  };
};
