from fastapi import FastAPI, WebSocket
import pandas as pd
import joblib
import asyncio
import random

app = FastAPI()

model = joblib.load("churn_model.pkl")
encoders = joblib.load("encoders.pkl")
FEATURES = joblib.load("features.pkl")

df = pd.read_csv("telco.csv")

DROP_COLS = [
    "CustomerID",
    "Lat Long",
    "Churn Reason",
    "Churn Label"
]

def preprocess(row):
    row = row.drop(DROP_COLS)
    
    for col, encoder in encoders.items():
        if col in row:
            row[col] = encoder.transform([str(row[col])])[0]

    return pd.DataFrame([row])[FEATURES]

@app.websocket("/ws/churn")
async def churn_stream(ws: WebSocket):
    await ws.accept()

    while True:
        sample = df.sample(1).iloc[0].copy()

        # Simulate real-time drift
        sample["Monthly Charges"] += random.uniform(-5, 5)
        sample["Tenure Months"] = max(
            0, sample["Tenure Months"] + random.choice([-1, 0, 1])
        )

        X = preprocess(sample)
        prob = model.predict_proba(X)[0][1]

        payload = {
            "customer": sample["CustomerID"],
            "tenure": int(sample["Tenure Months"]),
            "monthlyCharges": round(float(sample["Monthly Charges"]), 2),
            "churnProbability": round(float(prob), 3)
        }

        await ws.send_json(payload)
        print("Sending:", payload)
        await asyncio.sleep(2)

@app.get('/')
def health():
       return {
        "status": "ok",
        "service": "real-time churn predictor",
        "message": "backend is running"
    } 