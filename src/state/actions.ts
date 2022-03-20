import { Dispatch } from "redux";
import { State } from "./reducers";
import { Action, ActionType } from "./reducers/currencyReducer";

export const mapStateToProps = (state: State) => {
  return { currencyIndex: state.currency };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeCurrency: (currencyIndex: number) => {
      dispatch({ type: ActionType.CHANGE_CURRENCY, payload: currencyIndex });
    },
  };
};
