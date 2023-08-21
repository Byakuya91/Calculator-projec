// IMPORTS
import { useReducer } from "react";
import "./styles.css";
import { DigitButton } from "./Components/DigitButton";
import { OperationButton } from "./Components/OperationButton";

// TO DOS
// 1) Code Calculator functionality(ONGOING)
// 1A) Utilize use Reducer for the following
//  A) IMPLEMENT ADD_DIGIT(DONE)
//  B IMPLEMENT CHOOSE_OPERATION(DONE)
//  C) IMPLEMENT  CLEAR(DONE)
//  D) IMPLEMENT DELETE_DIGIT
//  E) IMPLEMENT EVALUATE(ONGOING)

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
    case ACTIONS.ADD_DIGIT:
      // Replaces new digit if a result is entered on the calculator.
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
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

      //  rewritting the operand when one was clicked accidentally.
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
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

    // Deleting a digit
    case ACTIONS.DELETE_DIGIT:
      // clear out everything
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      //  checking if an operand is there
      if (state.currentOperand == null) return state;
      // checking for one digit left IN THE OPERAND.
      if (state.currentOperand === 1) {
        return { ...state, currentOperand: null };
      }
      // deleting a digit
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    //  Hitting the equal button
    case ACTIONS.EVALUATE:
      // checking if all the values are present
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      //  performing the evaluation
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
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
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
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
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        {" "}
        ={" "}
      </button>
    </div>
  );
}

export default App;
