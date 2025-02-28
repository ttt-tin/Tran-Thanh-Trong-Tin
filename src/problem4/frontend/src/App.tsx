import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/calculations";

export default function App() {
  type CalculationRecord = {
    _id: string;
    method: string;
    number: number;
    duration: number;
    startTime: string;
    endTime: string;
  };
  
  const [history, setHistory] = useState<CalculationRecord[]>([]);
  const [number, setNumber] = useState("");
  const [method, setMethod] = useState("a");
  const [selectedRecord, setSelectedRecord] = useState<CalculationRecord | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const calculate = async () => {
    if (!number || isNaN(Number(number))) {
      alert("Please enter a valid number");
      return;
    }
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: Number(number), method }),
      });
      if (response.ok) {
        fetchHistory(); // Refresh history after calculation
      }
    } catch (error) {
      console.error("Error performing calculation:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Summation Calculator</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
      />
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="a">Loop-based</option>
        <option value="b">Recursion</option>
        <option value="c">Mathematical</option>
      </select>
      <button onClick={calculate}>Calculate</button>

      <h3>Calculation History</h3>
      <table border={1} style={{ margin: "20px auto", width: "80%" }}>
        <thead>
          <tr>
            <th>Method</th>
            <th>Input</th>
            <th>Duration (ms)</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record) => (
            <tr key={record._id}>
              <td>{record.method}</td>
              <td>{record.number}</td>
              <td>{record.duration}</td>
              <td>{new Date(record.startTime).toLocaleString()}</td>
              <td>
                <button onClick={() => setSelectedRecord(record)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRecord && (
        <div>
          <h3>Calculation Details</h3>
          <p>Method: {selectedRecord.method}</p>
          <p>Input: {selectedRecord.number}</p>
          <p>Duration: {selectedRecord.duration} ms</p>
          <p>
            Start Time: {new Date(selectedRecord.startTime).toLocaleString()}
          </p>
          <p>End Time: {new Date(selectedRecord.endTime).toLocaleString()}</p>
          <button onClick={() => setSelectedRecord(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
