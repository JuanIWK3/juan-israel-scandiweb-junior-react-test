export enum ActionType {
  CHANGE_CURRENCY = "change-currency",
}
interface IChangeCurrency {
  type: ActionType.CHANGE_CURRENCY;
  payload: number;
}
export type Action = IChangeCurrency;

const initialState: number = 0;

export const currencyReducer = (
  state: number = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENCY:
      return action.payload;
    default:
      return state;
  }
};
