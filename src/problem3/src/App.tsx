import { useState } from "react";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./solution";

function App() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [method, setMethod] = useState<string>("b"); // Default method: sum_to_n_b

  const calculateSum = () => {
    const n = parseInt(number);
    if (isNaN(n) || n < 0) return alert("Enter a valid positive number!");

    let sum;
    if (method === "a") sum = sum_to_n_a(n);
    else if (method === "b") sum = sum_to_n_b(n);
    else sum = sum_to_n_c(n);

    setResult(sum);
  };

  return (
    <div className="container">
      <h2>Summation Calculator</h2>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
      />

      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="a">Implementation 1 (Loop-based)</option>
        <option value="b">Implementation 2 (Recursion)</option>
        <option value="c">Implementation 3 (Mathematic)</option>
      </select>

      <button onClick={calculateSum}>Calculate</button>

      {result !== null && (
        <p>
          Sum: <span>{result}</span>
        </p>
      )}
    </div>
  );
}

export default App;
