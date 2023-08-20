// IMPORTS
import "./styles.css";

// TO DOS
// 1) Code Calculator functionality
//  2) Create CSS style sheet
// 3) Create Calculator components

function App() {
  return (
    //  Output: TOP OF THE CALCULATOR
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand"> 124,000 * </div>
        <div className="current-operand">124,000 </div>
      </div>
      {/* TOP BUTTONS  */}
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>÷</button>
      {/* NUMERICAL and OPERAND BUTTONS */}
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button> - </button>
      <button> . </button>
      <button> 0 </button>
      <button className="span-two"> = </button>
    </div>
  );
}

export default App;
