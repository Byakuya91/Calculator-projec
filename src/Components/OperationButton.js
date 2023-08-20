// IMPORTS
import { ACTIONS } from "../App";

export const OperationButton = ({ dispatch, operation }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { digit } })
      }
    >
      {operation}
    </button>
  );
};
