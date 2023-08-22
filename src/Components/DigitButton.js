// IMPORTS
import React from "react";
// Import ACTIONS from the correct file path
import { ACTIONS } from "../Reducers/calculatorReducer";

export const DigitButton = ({ dispatch, digit }) => (
  <button
    onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
  >
    {digit}
  </button>
);
