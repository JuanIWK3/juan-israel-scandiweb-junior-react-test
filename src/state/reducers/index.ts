import { combineReducers } from "redux";
import { currencyReducer } from "./currencyReducer";

export const reducers = combineReducers({ currency: currencyReducer });

export type State = ReturnType<typeof reducers>;
