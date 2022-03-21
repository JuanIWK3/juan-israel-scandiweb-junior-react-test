import { IProduct } from "../interfaces";

export enum ActionType {
  CHANGE_CURRENCY = "change-currency",
  ADD_CART_ITEM = "add-cart-item",
  INCREMENT_CART_ITEM = "increment-cart-item",
  DECREMENT_CART_ITEM = "decrement-cart-item",
}
interface IChangeCurrency {
  type: ActionType.CHANGE_CURRENCY;
  payload: number;
}
interface IAddCartItem {
  type: ActionType.ADD_CART_ITEM;
  payload: IProduct;
}
interface IIncrementCartItem {
  type: ActionType.INCREMENT_CART_ITEM;
  payload: number;
}
interface IDecrementCartItem {
  type: ActionType.DECREMENT_CART_ITEM;
  payload: number;
}

export type Action =
  | IChangeCurrency
  | IAddCartItem
  | IIncrementCartItem
  | IDecrementCartItem;
