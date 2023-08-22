// IMPORTS
// React Imports
import { useReducer } from "react";
// Styles Imports
import "./styles.css";
// Component Imports
import { DigitButton } from "./Components/DigitButton";
import { OperationButton } from "./Components/OperationButton";
import { ACTIONS, reducer, formatOperand } from "./Reducers/calculatorReducer";

function App() {
  // REDUCER HOOK:
  // A) INGREDIENTS(STATE)
  // 1) currentOperand: The currently entered/ displayed operand.
  // 2) previousOperand: The operand entered before selecting an operation.
  // 1) OPERATION: The currently entered/ displayed operand.

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  // Dispatch handler functions
  const clearHandler = () => {
    dispatch({ type: ACTIONS.CLEAR });
  };

  const deleteHandler = () => {
    dispatch({ type: ACTIONS.DELETE_DIGIT });
  };

  const evaluateHandler = () => {
    dispatch({ type: ACTIONS.EVALUATE });
  };

  return (
    // Output: TOP OF THE CALCULATOR
    <div className="calculator-grid">
      <div className="output">
        {/* Display previous operand, operation, and format */}
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        {/* Display current operand and format */}
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      {/* TOP BUTTONS */}
      <button className="span-two" onClick={clearHandler}>
        AC
      </button>
      <button onClick={deleteHandler}>DEL</button>
      {/* NUMERICAL and OPERAND BUTTONS */}
      <OperationButton operation="÷" dispatch={dispatch} />
      {/* <OperationButton operation="%" dispatch={dispatch} /> */}
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch}>
        *
      </OperationButton>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch}>
        +
      </OperationButton>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch}>
        {" "}
        -{" "}
      </OperationButton>
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={evaluateHandler}>
        {" "}
        ={" "}
      </button>
    </div>
  );
}

export default App;
