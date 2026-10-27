import joblib

model = joblib.load("models/top15_model.pkl")
features = joblib.load("models/top15_features.pkl")
attack_classes = joblib.load("models/attack_classes.pkl")

print("MODEL:")
print(model)

print("\nFEATURES:")
print(features)

print("\nATTACK CLASSES:")
print(attack_classes)

print("\nMODEL CLASSES:")
print(model.classes_)