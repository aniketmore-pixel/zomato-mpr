import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function ChurnLineChart({ data }) {
    const chartData = [...data].reverse();

    return (
        <div className="card">
            <h4>📈 Churn Probability Trend</h4>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                    <XAxis dataKey="timestamp" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="churnProbability"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
