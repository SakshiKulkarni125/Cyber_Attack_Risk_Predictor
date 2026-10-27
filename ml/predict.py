import joblib
import pandas as pd
from pathlib import Path

MODEL_DIR = Path(__file__).resolve().parent / "models"

model = joblib.load(MODEL_DIR / "top15_model.pkl")
features = joblib.load(MODEL_DIR / "top15_features.pkl")
attack_classes = joblib.load(MODEL_DIR / "attack_classes.pkl")

features = [
    "service_-" if feature == "service_" else feature
    for feature in features
]


def predict_attack(input_data):
    # Create DataFrame using the exact feature order
    df = pd.DataFrame([input_data])

    # Make sure all required features exist
    df = df[features]

    # Prediction
    prediction = model.predict(df)[0]

    # Prediction probabilities
    probabilities = model.predict_proba(df)[0]

    # Get probability of predicted class
    predicted_index = list(model.classes_).index(prediction)
    attack_probability = probabilities[predicted_index]

    # Convert class index to attack name if necessary
    attack_type = prediction

    return {
        "attack_type": attack_type,
        "attack_probability": float(attack_probability)
    }