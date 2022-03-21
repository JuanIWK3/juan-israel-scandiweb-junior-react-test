import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { currencyReducer } from "./currencyReducer";

export const reducers = combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
});

export type State = ReturnType<typeof reducers>;
