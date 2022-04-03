import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { categoryReducer } from './categoryReducer';
import { currencyReducer } from './currencyReducer';

export const reducers = combineReducers({
  currency: currencyReducer,
  category: categoryReducer,
  cart: cartReducer,
});

export type State = ReturnType<typeof reducers>;
