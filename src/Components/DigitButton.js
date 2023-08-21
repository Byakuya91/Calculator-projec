// IMPORTS
import React from "react";
import { ACTIONS } from "../App";

export const DigitButton = ({ dispatch, digit }) => (
  <button
    onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
  >
    {digit}
  </button>
);
