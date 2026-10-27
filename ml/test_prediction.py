import joblib
import pandas as pd

# Load trained model
model = joblib.load(
    r"D:\Cyber_Attack_Risk_Predictor\ml\models\top15_model.pkl"
)

# Load top-15 feature list
features = joblib.load(
    r"D:\Cyber_Attack_Risk_Predictor\ml\models\top15_features.pkl"
)

# Load encoder
encoder = joblib.load(
    r"D:\Cyber_Attack_Risk_Predictor\ml\models\encoder.pkl"
)

# Load testing data
test_path = r"D:\Cyber_Attack_Risk_Predictor\data\raw\UNSW_NB15_testing-set.csv"
test_df = pd.read_csv(test_path)

# Separate categorical columns
categorical_features = ["proto", "service", "state"]

# Encode categorical features
encoded = encoder.transform(test_df[categorical_features])

encoded_df = pd.DataFrame(
    encoded,
    columns=encoder.get_feature_names_out(categorical_features),
    index=test_df.index
)


# Get numerical features
numerical_features = [
    col for col in test_df.columns
    if col not in [
        "proto",
        "service",
        "state",
        "attack_cat",
        "label",
        "id"
    ]
]

# Combine numerical + encoded categorical features
X_processed = pd.concat(
    [
        test_df[numerical_features],
        encoded_df
    ],
    axis=1
)

# Fix feature name mismatch
features = [
    "service_-" if feature == "service_" else feature
    for feature in features
]

# Select the 15 features used by the model
X = X_processed[features].iloc[:10]

# Make predictions for 10 samples
predictions = model.predict(X)
probabilities = model.predict_proba(X)

print("\n===== 10 SAMPLE PREDICTIONS =====")

for i in range(10):
    prediction = predictions[i]

    # Get probability of the predicted class
    class_index = list(model.classes_).index(prediction)
    probability = probabilities[i][class_index]

    print(
        f"Sample {i + 1}: "
        f"Prediction = {prediction}, "
        f"Probability = {probability:.2%}"
    )