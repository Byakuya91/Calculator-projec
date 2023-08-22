// IMPORTS
import React from "react";
// Import ACTIONS from the correct file path
import { ACTIONS } from "../Reducers/calculatorReducer";

export const OperationButton = ({ dispatch, operation }) => (
  <button
    onClick={() =>
      dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
    }
  >
    {operation}
  </button>
);
