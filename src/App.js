// IMPORTS
import { useReducer } from "react";
import "./styles.css";
import { DigitButton } from "./Components/DigitButton";
import { OperationButton } from "./Components/OperationButton";

// TO DOS
// 1) Code Calculator functionality(ONGOING)
// 1A) Utilize use Reducer for the following
//  A) IMPLEMENT ADD_DIGIT(DONE)
//  B IMPLEMENT CHOOSE_OPERATION
//  C) IMPLEMENT  CLEAR
//  D) IMPLEMENT DELETE_DIGIT
//  E) IMPLEMENT EVALUATE

//  2) Create CSS style sheet and style(DONE)
//  2A) Figure out Button layout(DONE)
// 2B) Figure out Screen layout(DONE)
// 2C) Figure out Calculator layout(DONE)

//  Global variable for Actions for Caculator functionality and useReducer
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: " clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

// Reducer function
function reducer(state, { type, payload }) {
  switch (type) {
    // Adding Digits
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand === ".") return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    // selecting the operation
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      // default action if operand button is clicked and values are on the screen, do the operand.
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    //  Clearing the digits from the screen
    case ACTIONS.CLEAR:
      return {};
  }
}

// function to evaluate the calculation of the calculator
function evaluate({ currentOperand, previousOperand, operation }) {
  // converting the strings to numbers
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // checking if the values don't exist
  if (isNaN(prev) || isNaN(current)) return "";

  // getting the computed value
  let computation = "";

  // When the buttons are pushed
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  //  return the value
  return computation.toString();
}

function App() {
  //   DEFINE REDUCER
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    //  Output: TOP OF THE CALCULATOR
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {" "}
          {previousOperand} {operation}{" "}
        </div>
        <div className="current-operand">{currentOperand} </div>
      </div>
      {/* TOP BUTTONS  */}
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button>DEL</button>
      {/* NUMERICAL and OPERAND BUTTONS */}
      <OperationButton operation="÷" dispatch={dispatch} />
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
      <button className="span-two"> = </button>
    </div>
  );
}

export default App;
