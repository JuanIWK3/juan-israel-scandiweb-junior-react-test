import { Action, ActionType } from '../types';

const initialState = 0;

export const currencyReducer = (
  state: number = initialState,
  action: Action,
) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENCY:
      return action.payload;
    default:
      return state;
  }
};
