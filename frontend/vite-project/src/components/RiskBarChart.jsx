import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function RiskBarChart({ data }) {
    const risk = { Low: 0, Medium: 0, High: 0 };

    data.forEach(d => {
        if (d.churnProbability < 0.4) risk.Low++;
        else if (d.churnProbability < 0.7) risk.Medium++;
        else risk.High++;
    });

    const chartData = Object.keys(risk).map(k => ({
        risk: k,
        count: risk[k]
    }));

    return (
        <div className="card">
            <h4>📊 Churn Risk Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                    <XAxis dataKey="risk" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
