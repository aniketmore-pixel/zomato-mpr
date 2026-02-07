import useChurnSocket from "./hooks/useChurnSocket";

function App() {
  const data = useChurnSocket();

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Real-Time Churn Predictor</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Tenure</th>
            <th>Monthly Charges</th>
            <th>Churn Probability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.customer}</td>
              <td>{row.tenure}</td>
              <td>₹{row.monthlyCharges}</td>
              <td style={{ color: row.churnProbability > 0.6 ? "red" : "green" }}>
                {row.churnProbability}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
