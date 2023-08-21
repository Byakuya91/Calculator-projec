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
//  D) IMPLEMENT DELETE_DIGIT(DONE)
//  E) IMPLEMENT EVALUATE(DONE)
//  F) IMPLEMENT PERCENTAGE(ONGOING)
//  H) IMPLEMENT SQUARE ROOT(ONGOING)

//  2) Create CSS style sheet and style(DONE)
//  2A) Figure out Button layout(DONE)
// 2B) Figure out Screen layout(DONE)
// 2C) Figure out Calculator layout(DONE)

// 3) Refactoring Code
// 3A) Implemented Helper functions to clean up the Reducer and make it easier to read(DONE)

// Global variable for Actions for Calculator functionality and useReducer
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: " clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
  // NEW ACTIONS
  // PERCENTAGE: "percentage",
  // SQUARE_ROOT: "square-root",
};

// Reducer function
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return handleAddDigit(state, payload.digit);

    case ACTIONS.CHOOSE_OPERATION:
      return handleChooseOperation(state, payload.operation);

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      return handleDeleteDigit(state);

    case ACTIONS.EVALUATE:
      return handleEvaluate(state);

    default:
      return state; // or throw an error if you want to catch unexpected cases
  }
}

// Helper functions for each action type

// Function to handle adding a digit to the current operand
function handleAddDigit(state, digit) {
  // If the overwrite flag is true, replace the current operand with the new digit
  if (state.overwrite) {
    return {
      ...state,
      currentOperand: digit,
      overwrite: false,
    };
  }

  // If the new digit is 0 and the current operand is already 0, no change is needed
  if (digit === "0" && state.currentOperand === "0") return state;

  // If the new digit is a decimal point and the current operand already has one, no change is needed
  if (digit === "." && state.currentOperand === ".") return state;

  // Otherwise, concatenate the new digit to the current operand, handling the case where it's initially empty
  return {
    ...state,
    currentOperand: `${state.currentOperand || ""}${digit}`,
  };
}

// Function to handle choosing an operation
function handleChooseOperation(state, operation) {
  // If both current and previous operands are null, no change is needed
  if (state.currentOperand == null && state.previousOperand == null) {
    return state;
  }

  // If current operand is null, only update the operation
  if (state.currentOperand == null) {
    return {
      ...state,
      operation,
    };
  }

  // If previous operand is null, set it to the current operand and clear current operand
  if (state.previousOperand == null) {
    return {
      ...state,
      operation,
      previousOperand: state.currentOperand,
      currentOperand: null,
    };
  }

  // Default action when operand button is clicked and values are on the screen, perform the operation.
  return {
    ...state,
    previousOperand: evaluate(state),
    operation,
    currentOperand: null,
  };
}

// Function to handle deleting a digit from the current operand
function handleDeleteDigit(state) {
  // If overwrite flag is true, clear the current operand
  if (state.overwrite) {
    return {
      ...state,
      overwrite: false,
      currentOperand: null,
    };
  }

  // If current operand is null, no change is needed
  if (state.currentOperand == null) return state;

  // If current operand is a single digit, clear it
  if (state.currentOperand === 1) {
    return { ...state, currentOperand: null };
  }

  // Remove the last digit from the current operand
  return {
    ...state,
    currentOperand: state.currentOperand.slice(0, -1),
  };
}

// Function to handle evaluating the calculation
function handleEvaluate(state) {
  // If any of the necessary values are null, no change is needed
  if (
    state.operation == null ||
    state.currentOperand == null ||
    state.previousOperand == null
  ) {
    return state;
  }

  // Performing the evaluation
  return {
    ...state,
    overwrite: true,
    previousOperand: null,
    operation: null,
    currentOperand: evaluate(state),
  };
}

// Function to evaluate the calculation of the calculator
function evaluate({ currentOperand, previousOperand, operation }) {
  // Converting the strings to numbers
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // Logging the values for debugging
  console.log("Operation:", operation);
  console.log("Previous Operand:", prev);
  console.log("Current Operand:", current);

  // Checking if the values don't exist
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }

  // Handling division by zero
  if (operation === "÷" && current === 0) {
    return "undefined"; // or "error" or any custom message you prefer
  }

  // Getting the computed value
  switch (operation) {
    case "+":
      // Addition
      return (prev + current).toString();
    case "-":
      // Subtraction
      return (prev - current).toString();
    case "*":
      // Multiplication
      return (prev * current).toString();
    case "÷":
      // Division
      return (prev / current).toString();
    default:
      // Default case for unexpected operation
      return "";
  }
}

// Formatting the Digits
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  // checking for an Operand
  if (operand == null) return;
  // grabbing integer and decimal portions of the numbers
  const [integer, decimal] = operand.split(".");
  // if there is NO decimal on the number
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  // return the decimal portion as well
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  // REDUCER HOOK:
  // A) RECIPES(STATE)
  // 1) currentOperand: The currently entered/ displayed operand.
  // 2) previousOperand: The operand entered before selecting an operation.
  // 1) OPERATION: The currently entered/ displayed operand.

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  // Dispatch functions
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
