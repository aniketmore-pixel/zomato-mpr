export default function KPIs({ data }) {
    if (!data.length) return null;

    const avgChurn =
        (data.reduce((a, b) => a + b.churnProbability, 0) / data.length).toFixed(2);

    const highRisk = data.filter(d => d.churnProbability > 0.7).length;

    return (
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            <div className="card">
                <h4>📉 Avg Churn</h4>
                <h2>{avgChurn}</h2>
            </div>

            <div className="card">
                <h4>🚨 High Risk Customers</h4>
                <h2>{highRisk}</h2>
            </div>

            <div className="card">
                <h4>📡 Live Events</h4>
                <h2>{data.length}</h2>
            </div>
        </div>
    );
}
