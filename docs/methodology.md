# Cyber Attack Risk Predictor
# Machine Learning Methodology and Documentation

## 1. Project Overview

The Cyber Attack Risk Predictor is a machine-learning-based cybersecurity system designed to detect malicious network traffic and identify the category of a cyber attack.

The project uses the UNSW-NB15 dataset, which contains network traffic representing both normal activities and different types of cyber attacks.

The machine learning component of the project performs two main tasks:

1. **Binary Classification** – determines whether network traffic is Normal or an Attack.
2. **Multiclass Classification** – identifies the specific category of network traffic or cyber attack.

After training and evaluating the models, feature importance analysis is performed to identify the most informative features. The 15 most important features are then selected to create the final reduced-feature model.

The overall machine learning workflow is:

```text
UNSW-NB15 Dataset
        ↓
Dataset Loading
        ↓
Dataset Exploration
        ↓
Data Cleaning & Validation
        ↓
Feature Identification
        ↓
Categorical Feature Encoding
        ↓
Target/Feature Separation
        ↓
Binary Classification
        ↓
Multiclass Classification
        ↓
Class Imbalance Analysis
        ↓
Feature Importance Analysis
        ↓
Top-15 Feature Selection
        ↓
Final Random Forest Model
        ↓
Model Evaluation
        ↓
Prediction Function
        ↓
Attack Category + Confidence
```

---

# 2. Dataset

## 2.1 Dataset Used

The project uses the **UNSW-NB15 dataset**, a network intrusion detection dataset developed for cybersecurity and network traffic analysis research.

The dataset contains normal network traffic as well as multiple categories of malicious network activity.

Two files are used:

* UNSW-NB15 training dataset
* UNSW-NB15 testing dataset

The training data is used to train the machine learning models, while the testing data is used to evaluate the models on previously unseen samples.

## 2.2 Dataset Size

The dataset dimensions used in the project are:

| Dataset  | Records | Columns |
| -------- | ------: | ------: |
| Training | 175,341 |      45 |
| Testing  |  82,332 |      45 |

Therefore, the complete dataset used by the project contains:

```text
Training records: 175,341
Testing records:   82,332
Total records:    257,673
```

The original dataset contains 45 columns.

---

# 3. Dataset Exploration

The first stage of the project was exploratory data analysis.

The purpose of dataset exploration was to understand:

* Dataset dimensions
* Feature names
* Data types
* Numerical features
* Categorical features
* Target variables
* Missing values
* Duplicate records
* Class distribution
* Distribution of attack categories

The training and testing datasets were loaded using Pandas.

```python
import pandas as pd
import numpy as np

train_df = pd.read_csv(train_path)
test_df = pd.read_csv(test_path)
```

The dimensions were verified after loading:

```text
Training shape: (175341, 45)
Testing shape:  (82332, 45)
```

This confirmed that the expected training and testing datasets were successfully loaded.

---

# 4. Data Quality Analysis

Before training the machine learning models, the dataset was checked for missing values and duplicate records.

## 4.1 Missing Values

Missing values were checked using:

```python
train_df.isnull().sum().sum()
test_df.isnull().sum().sum()
```

The results were:

```text
Training missing values: 0
Testing missing values: 0
```

Therefore, no missing-value imputation was required.

## 4.2 Duplicate Records

Duplicate records were also checked during the data validation stage.

The analysis showed that the datasets did not contain problematic duplicate records requiring removal.

This allowed the available records to be used for subsequent preprocessing and model development.

---

# 5. Feature Identification

The dataset contains both numerical and categorical attributes.

Categorical columns were identified using Pandas:

```python
categorical_cols = train_df.select_dtypes(
    include=["object"]
).columns.tolist()
```

The categorical columns identified were:

```text
proto
service
state
attack_cat
```

The dataset therefore contains:

```text
Numerical columns: 41
Categorical columns: 4
```

The `attack_cat` column is treated as the multiclass target rather than as an input feature.

The remaining categorical network attributes are encoded before being provided to the machine learning model.

---

# 6. Target Variables

Two target variables are used for two different prediction tasks.

## 6.1 Binary Classification Target

The `label` column is used for binary classification.

The target represents:

```text
0 → Normal
1 → Attack
```

The binary classification task is therefore:

```text
Network Traffic
       ↓
Random Forest
       ↓
Normal / Attack
```

The testing dataset contains:

| Label | Category | Samples |
| ----: | -------- | ------: |
|     0 | Normal   |  37,000 |
|     1 | Attack   |  45,332 |

The binary model therefore focuses on identifying whether network traffic should be considered normal or malicious.

---

# 7. Multiclass Classification Target

The `attack_cat` column is used for multiclass classification.

The model predicts the following categories:

```text
Analysis
Backdoor
DoS
Exploits
Fuzzers
Generic
Normal
Reconnaissance
Shellcode
Worms
```

The multiclass prediction task is:

```text
Network Traffic
       ↓
Random Forest
       ↓
Specific Traffic / Attack Category
```

Unlike binary classification, the multiclass model must distinguish between ten different categories.

---

# 8. Feature and Target Separation

The following columns are not used as predictive input features:

```text
id
label
attack_cat
```

### `id`

The `id` column is an identifier and does not represent meaningful network behavior.

### `label`

The `label` column is the target for binary classification and therefore cannot be used as an input feature.

### `attack_cat`

The `attack_cat` column is the target for multiclass classification and therefore cannot be used as an input feature.

The target variables are stored separately:

```python
y_train_binary = train_df["label"]
y_train_multiclass = train_df["attack_cat"]

y_test_binary = test_df["label"]
y_test_multiclass = test_df["attack_cat"]
```

This separation prevents target leakage during model training.

---

# 9. Data Preprocessing

Machine learning algorithms require numerical input.

The network traffic dataset contains categorical attributes such as:

```text
proto
service
state
```

These categorical features are converted into numerical representations during preprocessing.

The preprocessing stage therefore consists of:

```text
Raw Dataset
     ↓
Identify Categorical Features
     ↓
Encode Categorical Features
     ↓
Create Numerical Feature Matrix
     ↓
Separate Features and Targets
     ↓
Machine Learning Model
```

The same feature representation must be maintained between the training, testing, and prediction stages.

This is important because the final model expects the input features in a consistent format.

---

# 10. Machine Learning Algorithm

The primary machine learning algorithm used in this project is the **Random Forest Classifier**.

Random Forest is an ensemble learning algorithm that combines multiple decision trees to produce a final prediction.

It was selected because it:

* Handles numerical features effectively.
* Can work with high-dimensional datasets.
* Captures nonlinear relationships.
* Provides feature importance values.
* Can be used for both binary and multiclass classification.
* Is relatively robust to noisy network traffic features.

The Random Forest algorithm is used throughout the project for both binary and multiclass prediction.

---

# 11. Binary Classification Model

The first model performs binary classification.

Its objective is to distinguish between:

```text
Normal
Attack
```

The workflow is:

```text
Training Dataset
       ↓
Preprocessing
       ↓
Feature Matrix
       ↓
Random Forest Classifier
       ↓
Normal / Attack
```

The model was evaluated using:

* Accuracy
* Precision
* Recall
* F1-score
* Confusion Matrix

---

# 12. Binary Classification Results

The binary Random Forest model achieved the following results:

| Metric    | Result |
| --------- | -----: |
| Accuracy  | 89.36% |
| Precision | 85.22% |
| Recall    | 97.60% |
| F1-score  | 90.99% |

The classification results were:

| Class  | Precision | Recall | F1-score |
| ------ | --------: | -----: | -------: |
| Normal |      0.96 |   0.79 |     0.87 |
| Attack |      0.85 |   0.98 |     0.91 |

The attack class achieved a recall of approximately **98%**.

This indicates that the binary model successfully identifies most attack samples in the testing dataset.

The binary confusion matrix was:

| Actual / Predicted | Normal | Attack |
| ------------------ | -----: | -----: |
| Normal             | 29,325 |  7,675 |
| Attack             |  1,089 | 44,243 |

The model correctly identified:

```text
29,325 Normal samples
44,243 Attack samples
```

However, some normal traffic was classified as attack traffic, and some attack traffic was classified as normal.

---

# 13. Multiclass Classification

After binary classification, a multiclass Random Forest model was developed.

The purpose of this model is to identify the specific network traffic or attack category.

The model predicts:

```text
Analysis
Backdoor
DoS
Exploits
Fuzzers
Generic
Normal
Reconnaissance
Shellcode
Worms
```

The multiclass model is more challenging because it must distinguish between ten different classes rather than only two.

---

# 14. Initial Multiclass Model Results

The initial multiclass Random Forest model achieved:

```text
Accuracy: 69.23%
```

The classification results were:

| Class          | Precision | Recall | F1-score |
| -------------- | --------: | -----: | -------: |
| Analysis       |      0.01 |   0.02 |     0.01 |
| Backdoor       |      0.05 |   0.62 |     0.10 |
| DoS            |      0.38 |   0.18 |     0.24 |
| Exploits       |      0.78 |   0.63 |     0.70 |
| Fuzzers        |      0.26 |   0.70 |     0.38 |
| Generic        |      1.00 |   0.96 |     0.98 |
| Normal         |      0.99 |   0.63 |     0.77 |
| Reconnaissance |      0.86 |   0.84 |     0.85 |
| Shellcode      |      0.27 |   0.79 |     0.41 |
| Worms          |      0.71 |   0.50 |     0.59 |

The model performs well for several classes with larger numbers of samples but has difficulty with some minority categories.

---

# 15. Class Imbalance Analysis

One of the major challenges identified in the dataset is class imbalance.

The testing dataset contains:

| Attack Category | Samples |
| --------------- | ------: |
| Normal          |  37,000 |
| Generic         |  18,871 |
| Exploits        |  11,132 |
| Fuzzers         |   6,062 |
| DoS             |   4,089 |
| Reconnaissance  |   3,496 |
| Analysis        |     677 |
| Backdoor        |     583 |
| Shellcode       |     378 |
| Worms           |      44 |

The difference between the majority and minority classes is substantial.

For example:

```text
Normal → 37,000 samples
Worms  → 44 samples
```

This imbalance can cause the model to learn majority classes more effectively than rare attack categories.

This is particularly important in cybersecurity because rare attacks may still be important even if they represent a small percentage of the dataset.

---

# 16. Class Weighting

To investigate the effect of class imbalance, class weights were calculated.

The calculated weights were:

| Class          |   Weight |
| -------------- | -------: |
| Analysis       |   8.7670 |
| Backdoor       |  10.0424 |
| DoS            |   1.4297 |
| Exploits       |   0.5251 |
| Fuzzers        |   0.9643 |
| Generic        |   0.4384 |
| Normal         |   0.3131 |
| Reconnaissance |   1.6713 |
| Shellcode      |  15.4758 |
| Worms          | 134.8777 |

Higher weights were assigned to classes with fewer samples.

The objective was to give minority classes greater importance during model training.

---

# 17. Balanced Multiclass Model

A balanced Random Forest model was trained using the calculated class weights.

The objective was to determine whether class weighting could improve the classification of minority attack categories.

The balanced model achieved:

```text
Accuracy: 69.17%
```

The result was very close to the original multiclass model:

```text
Original multiclass model: 69.23%
Balanced multiclass model: 69.17%
```

This experiment showed that class weighting alone did not produce a significant improvement in overall accuracy.

It also demonstrated the difficulty of accurately classifying extremely rare attack categories in the UNSW-NB15 dataset.

---

# 18. Feature Importance Analysis

One of the advantages of Random Forest is that it provides feature importance values.

Feature importance analysis was performed to identify which network traffic features contributed most strongly to the model's predictions.

The top 15 features were:

| Rank | Feature          | Importance |
| ---: | ---------------- | ---------: |
|    1 | sbytes           |   0.100678 |
|    2 | smean            |   0.084570 |
|    3 | ct_dst_src_ltm   |   0.045463 |
|    4 | ct_srv_dst       |   0.044668 |
|    5 | sload            |   0.040885 |
|    6 | ct_srv_src       |   0.037612 |
|    7 | sttl             |   0.032939 |
|    8 | service_-        |   0.031830 |
|    9 | dbytes           |   0.030103 |
|   10 | dmean            |   0.027704 |
|   11 | dload            |   0.026371 |
|   12 | proto_udp        |   0.024833 |
|   13 | rate             |   0.024815 |
|   14 | dur              |   0.023495 |
|   15 | ct_dst_sport_ltm |   0.021609 |

The results show that `sbytes` and `smean` were the most important features among the selected features.

---

# 19. Top-15 Feature Selection

Based on the feature importance analysis, the 15 most important features were selected.

The final feature set is:

```text
sbytes
smean
ct_dst_src_ltm
ct_srv_dst
sload
ct_srv_src
sttl
service_-
dbytes
dmean
dload
proto_udp
rate
dur
ct_dst_sport_ltm
```

The reduced feature datasets have the following dimensions:

```text
Training shape: (175341, 15)
Testing shape:  (82332, 15)
```

The feature selection process therefore reduces the model input from the original feature representation to 15 selected features.

The purpose of this step is to:

* Reduce the number of model inputs.
* Focus on informative network traffic characteristics.
* Reduce unnecessary features.
* Simplify model input requirements.
* Investigate whether feature selection improves predictive performance.

---

# 20. Final Top-15 Random Forest Model

A new Random Forest model was trained using only the selected 15 features.

The model achieved:

```text
Accuracy: 76.82%
```

The comparison is:

```text
Initial Multiclass Model:   69.23%
Balanced Multiclass Model:  69.17%
Top-15 Feature Model:       76.82%
```

The Top-15 feature model therefore achieved higher overall accuracy than both of the earlier multiclass models.

This result demonstrates that selecting informative features can potentially improve model performance while reducing the number of input variables.

---

# 21. Top-15 Model Classification Results

The Top-15 model produced the following results:

| Class          | Precision | Recall | F1-score |
| -------------- | --------: | -----: | -------: |
| Analysis       |      0.01 |   0.02 |     0.02 |
| Backdoor       |      0.05 |   0.09 |     0.07 |
| DoS            |      0.60 |   0.14 |     0.22 |
| Exploits       |      0.59 |   0.86 |     0.70 |
| Fuzzers        |      0.29 |   0.56 |     0.38 |
| Generic        |      1.00 |   0.97 |     0.99 |
| Normal         |      0.96 |   0.76 |     0.85 |
| Reconnaissance |      0.93 |   0.79 |     0.85 |
| Shellcode      |      0.33 |   0.74 |     0.46 |
| Worms          |      0.66 |   0.52 |     0.58 |

The model performs particularly well for:

* Generic
* Normal
* Reconnaissance
* Exploits

The model continues to have difficulty with rare categories such as:

* Analysis
* Backdoor

The lower performance of these classes is associated with their limited representation in the dataset.

---

# 22. Final Feature Order

The final prediction model expects exactly 15 features.

The feature order is:

```python
[
    'sbytes',
    'smean',
    'ct_dst_src_ltm',
    'ct_srv_dst',
    'sload',
    'ct_srv_src',
    'sttl',
    'service_-',
    'dbytes',
    'dmean',
    'dload',
    'proto_udp',
    'rate',
    'dur',
    'ct_dst_sport_ltm'
]
```

The order is important.

When the model is integrated with the backend, the input data must contain these features in the same structure expected by the trained model.

The verified testing feature matrix has:

```text
X_test_top15 shape: (82332, 15)
Expected features: 15
```

---

# 23. Trained Model Files

The trained machine learning models and supporting files are stored in the project's `ml/models/` directory.

The important files include:

```text
ml/
└── models/
    ├── cyber_attack_multiclass_model.pkl
    ├── top15_features.pkl
    ├── attack_classes.pkl
    └── top15_model.pkl
```

The exact filenames should be checked in the repository because model files may be updated during development.

The model files are managed using Git LFS because trained machine learning models can be large.

The raw dataset is kept locally and is not intended to be uploaded to the GitHub repository.

---

# 24. Model Loading

The trained model can be loaded using `joblib`.

Example:

```python
import joblib

model = joblib.load(
    "ml/models/cyber_attack_multiclass_model.pkl"
)

features = joblib.load(
    "ml/models/top15_features.pkl"
)

classes = joblib.load(
    "ml/models/attack_classes.pkl"
)
```

The backend integration should use the final model file selected for deployment and the corresponding feature list.

---

# 25. Prediction Function

A prediction function was developed to use the trained model for new network traffic samples.

The prediction pipeline is:

```text
New Network Traffic
        ↓
Feature Extraction
        ↓
Top-15 Feature Selection
        ↓
Preprocessing
        ↓
Final Random Forest Model
        ↓
Predicted Attack Category
        ↓
Prediction Confidence
```

The prediction system produces:

1. Predicted attack category
2. Prediction confidence

Example output:

```text
===== CYBER ATTACK PREDICTION =====

Predicted class: Fuzzers
Confidence: 42.16%
```

This prediction function forms the connection between the trained machine learning model and the future backend application.

---

# 26. Prediction Demonstration

The prediction function was tested using samples from the test dataset.

Example predictions included:

| Actual Class   | Predicted Class | Confidence |
| -------------- | ---------------- | ---------: |
| Normal         | Fuzzers          |     42.16% |
| Reconnaissance | Exploits         |     36.67% |
| Backdoor       | Exploits         |     36.67% |
| DoS            | Exploits         |     36.67% |
| Exploits       | Exploits         |     50.65% |
| Analysis       | Exploits         |     18.10% |
| Fuzzers        | Exploits         |     57.15% |
| Worms          | Exploits         |     62.53% |
| Shellcode      | Shellcode        |     90.00% |
| Generic        | Generic          |    100.00% |

The demonstration confirms that the trained model can receive a feature vector and return a predicted class and associated confidence value.

The incorrect predictions in some samples also demonstrate the limitations of the model, particularly for minority attack classes.

---

# 27. Model Verification

Before integration with the backend, the model input requirements were verified.

The verification confirmed:

```text
Model type: RandomForestClassifier
Number of input features: 15
Testing dataset shape: (82332, 15)
Expected features: 15
```

The feature list was also verified to ensure that the test data and trained model use the same feature structure.

This verification helps prevent integration problems caused by:

* Missing features
* Additional features
* Incorrect feature order
* Inconsistent preprocessing
* Incorrect data types

---

# 28. Model Comparison

The main experimental results are summarized below:

| Model                              | Task              |   Input Features | Accuracy |
| ----------------------------------- | ----------------- | ----------------: | -------: |
| Binary Random Forest               | Normal vs Attack  | Full feature set  |   89.36% |
| Initial Multiclass Random Forest   | Attack Category   | Full feature set  |   69.23% |
| Balanced Multiclass Random Forest  | Attack Category   | Full feature set  |   69.17% |
| Top-15 Random Forest               | Attack Category   |                15 |   76.82% |

The binary model achieved the highest accuracy because it only needs to distinguish between two classes.

The multiclass models have a more difficult task because they need to distinguish between ten different categories.

The Top-15 feature model achieved better overall accuracy than the original multiclass models, demonstrating the potential benefit of feature selection.

---

# 29. Confusion Matrix Analysis

Confusion matrices were used to evaluate the behavior of the classification models.

For binary classification, the confusion matrix showed that most attack samples were correctly identified.

For multiclass classification, the confusion matrix showed stronger performance for classes with larger representation in the dataset.

The Top-15 model performed particularly well for:

```text
Generic
Normal
Exploits
Reconnaissance
```

However, some minority categories were more frequently confused with other categories.

This is particularly important for:

```text
Analysis
Backdoor
DoS
Fuzzers
Shellcode
Worms
```

Therefore, accuracy alone is not sufficient for evaluating cybersecurity classification systems.

Precision, recall, F1-score, and confusion matrices should also be considered.

---

# 30. Overall Machine Learning Architecture

The complete machine learning architecture is:

```text
                    ┌──────────────────────┐
                    │   UNSW-NB15 Dataset  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Dataset Exploration  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Data Quality Checks  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Data Preprocessing   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Feature/Target       │
                    │ Separation           │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
          ┌─────────────────┐    ┌────────────────────┐
          │ Binary Random   │    │ Multiclass Random  │
          │ Forest          │    │ Forest             │
          └────────┬────────┘    └─────────┬──────────┘
                   │                       │
                   ▼                       ▼
          Normal / Attack          Attack Categories
                                           │
                                           ▼
                                  ┌──────────────────┐
                                  │ Class Imbalance  │
                                  │ Analysis         │
                                  └────────┬─────────┘
                                           │
                                           ▼
                                  ┌──────────────────┐
                                  │ Feature          │
                                  │ Importance       │
                                  └────────┬─────────┘
                                           │
                                           ▼
                                  ┌──────────────────┐
                                  │ Top-15 Features  │
                                  └────────┬─────────┘
                                           │
                                           ▼
                                  ┌──────────────────┐
                                  │ Final Random     │
                                  │ Forest Model     │
                                  └────────┬─────────┘
                                           │
                                           ▼
                                  ┌──────────────────┐
                                  │ Prediction       │
                                  │ Function         │
                                  └────────┬─────────┘
                                           │
                                           ▼
                              ┌────────────────────────┐
                              │ Attack Category +      │
                              │ Confidence Score       │
                              └────────────────────────┘
```

---

# 31. Technologies Used

The machine learning component uses the following technologies:

| Technology       | Purpose                                    |
| ---------------- | ------------------------------------------ |
| Python           | Machine learning implementation            |
| Pandas           | Dataset loading and manipulation           |
| NumPy            | Numerical operations                       |
| Scikit-learn     | Machine learning algorithms and evaluation |
| Random Forest    | Classification                             |
| Joblib           | Model serialization and loading            |
| Jupyter Notebook | ML experimentation and analysis            |
| Matplotlib       | Data visualization                         |
| Git              | Version control                            |
| Git LFS          | Large model file management                |

---

# 32. Limitations

## 32.1 Class Imbalance

The dataset contains highly imbalanced attack categories.

Some categories contain thousands of samples, while others contain only a small number.

This makes it difficult for the model to learn reliable patterns for rare attacks.

## 32.2 Dataset Dependency

The model is trained using UNSW-NB15.

Real-world network environments may contain traffic patterns that differ from the dataset.

Therefore, the model may require retraining or additional validation before being deployed in a different environment.

## 32.3 Rare Attack Categories

Categories such as Worms, Analysis, and Backdoor have relatively few samples.

This limits the amount of information available to the model for learning their characteristics.

## 32.4 Prediction Confidence

The confidence value represents the model's estimated probability for the predicted class.

It should not be interpreted as absolute certainty.

## 32.5 Real-Time Traffic

The current ML implementation operates on prepared network traffic data.

Additional components are required to collect and process live network traffic.

---

# 33. Future Work

The machine learning system can be extended in several ways.

## 33.1 Real-Time Network Monitoring

The model can be connected to a packet capture or network monitoring system so that network traffic can be analyzed in real time.

## 33.2 Web Application

A web-based dashboard can be developed to display:

* Network traffic information
* Predicted attack category
* Confidence score
* Attack statistics
* Historical predictions
* Detection alerts

## 33.3 Explainable AI

Explainable AI techniques can be integrated to show why a particular traffic sample was classified as a specific attack.

Feature-level explanations could help cybersecurity analysts understand the model's decisions.

## 33.4 Improved Imbalance Handling

Future work can investigate techniques such as:

* SMOTE
* Oversampling
* Undersampling
* Synthetic data generation
* Advanced class-weighting methods

These techniques may improve detection of rare attack categories.

## 33.5 Advanced Machine Learning

The Random Forest model can be compared with other algorithms such as:

* XGBoost
* LightGBM
* Support Vector Machines
* Neural Networks
* Deep Learning models

## 33.6 Continuous Learning

The system can be extended to periodically retrain the model using newly collected network traffic.

This could allow the system to adapt to changing attack patterns.

---

# 34. Final Results

The final experimental results are:

```text
Binary Random Forest
Accuracy  = 89.36%
Precision = 85.22%
Recall    = 97.60%
F1-score  = 90.99%

Initial Multiclass Random Forest
Accuracy  = 69.23%

Balanced Multiclass Random Forest
Accuracy  = 69.17%

Top-15 Feature Random Forest
Accuracy  = 76.82%
```

The final Top-15 model uses:

```text
15 input features
```

and predicts:

```text
Analysis
Backdoor
DoS
Exploits
Fuzzers
Generic
Normal
Reconnaissance
Shellcode
Worms
```

---

# 35. Conclusion

The Cyber Attack Risk Predictor demonstrates the use of machine learning for automated network intrusion detection and attack category prediction.

The UNSW-NB15 dataset was explored, validated, preprocessed, and used to train Random Forest classification models.

A binary classification model was first developed to distinguish normal network traffic from malicious traffic. The model achieved an accuracy of **89.36%** and an attack recall of **97.60%**.

A multiclass model was then developed to identify specific attack categories. The initial multiclass model achieved **69.23% accuracy**.

Class imbalance was investigated and class weighting was applied. The balanced model achieved **69.17% accuracy**, showing that class weighting alone did not substantially improve overall performance.

Feature importance analysis was then performed using Random Forest. The 15 most important features were selected and used to train a reduced-feature model.

The final Top-15 model achieved **76.82% accuracy**, which was higher than the original multiclass model while requiring only 15 input features.

The final machine learning system also includes a prediction function capable of accepting the required network traffic features and producing an attack category and confidence score.

The results demonstrate the potential of machine learning and feature selection for automated cyber attack detection. However, class imbalance and the limited number of samples for rare attack categories remain important challenges.

Future development will focus on real-time network monitoring, web-based visualization, explainable AI, improved handling of rare attack classes, and integration of the machine learning model with the project's backend and frontend components.