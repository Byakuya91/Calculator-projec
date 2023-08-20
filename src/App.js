// IMPORTS
import { useReducer } from "react";
import "./styles.css";
import { DigitButton } from "./Components/DigitButton";
import { OperationButton } from "./Components/OperationButton";

// TO DOS
// 1) Code Calculator functionality(ONGOING)
// 1A) Utilize use Reducer

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
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }

  }

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
      <button className="span-two">AC</button>
      <button>DEL</button>
      {/* NUMERICAL and OPERAND BUTTONS */}
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*">*</OperationButton>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+">+</OperationButton>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-"> - </OperationButton>
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two"> = </button>
    </div>
  );
}

export default App;
