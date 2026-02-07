import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

df = pd.read_csv("telco.csv")

DROP_COLS = [
    "CustomerID",
    "Lat Long",
    "Churn Reason",
    "Churn Label"
]

TARGET = "Churn Value"

df = df.drop(DROP_COLS, axis=1)

# Save feature list
FEATURES = [col for col in df.columns if col != TARGET]

# Encode categoricals
encoders = {}
for col in df.select_dtypes(include="object"):
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    encoders[col] = le

X = df[FEATURES]
y = df[TARGET]

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
model.fit(X, y)

joblib.dump(model, "churn_model.pkl")
joblib.dump(encoders, "encoders.pkl")
joblib.dump(FEATURES, "features.pkl")

print("✅ Model trained correctly")
