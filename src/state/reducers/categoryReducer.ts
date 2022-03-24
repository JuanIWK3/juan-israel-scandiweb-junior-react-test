import { Action, ActionType } from "../types";

const initialState: number = 0;

export const categoryReducer = (
  state: number = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.CHANGE_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};
