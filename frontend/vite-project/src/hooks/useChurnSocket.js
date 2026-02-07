import { useEffect, useState } from "react";

export default function useChurnSocket() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000/ws/churn");

        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            msg.timestamp = new Date().toLocaleTimeString();

            setData(prev => [msg, ...prev].slice(0, 30));
        };

        return () => ws.close();
    }, []);

    return data;
}
