# Cyber Attack Risk Predictor
# Model Results and Evaluation

## 1. Overview

This document presents the experimental results and evaluation of the machine learning models developed for the Cyber Attack Risk Predictor.

The project evaluates Random Forest models for:

1. Binary classification of network traffic into Normal and Attack.
2. Multiclass classification of network traffic into specific attack categories.
3. Class imbalance handling using class weighting.
4. Feature importance analysis.
5. Top-15 feature selection.
6. Final reduced-feature model evaluation.
7. Prediction testing on unseen test samples.

The main objective of the experiments is to determine how effectively the machine learning system can identify malicious network traffic and classify different attack categories.

---

# 2. Dataset Results

The UNSW-NB15 dataset was used for model development and evaluation.

| Dataset | Samples | Features |
|---|---:|---:|
| Training | 175,341 | 45 |
| Testing | 82,332 | 45 |

After preprocessing and feature selection, the final reduced-feature datasets contained:

| Dataset | Samples | Final Features |
|---|---:|---:|
| Training | 175,341 | 15 |
| Testing | 82,332 | 15 |

The final model therefore uses only 15 selected features for prediction.

---

# 3. Evaluation Metrics

The following metrics were used to evaluate the classification models.

## 3.1 Accuracy

Accuracy represents the proportion of correctly classified samples out of all samples.

```text
Accuracy =
Correct Predictions / Total Predictions
```

Accuracy provides an overall measure of model performance.

However, accuracy alone can be misleading when the dataset is highly imbalanced.

---

## 3.2 Precision

Precision measures how many samples predicted as a particular class actually belong to that class.

```text
Precision =
True Positives / (True Positives + False Positives)
```

High precision means the model produces fewer false positive predictions.

---

## 3.3 Recall

Recall measures how many actual samples belonging to a class were successfully identified.

```text
Recall =
True Positives / (True Positives + False Negatives)
```

Recall is particularly important in cybersecurity because missing an actual attack can be more serious than incorrectly flagging normal traffic.

---

## 3.4 F1-score

The F1-score combines precision and recall.

```text
F1-score =
2 × (Precision × Recall) / (Precision + Recall)
```

It provides a balanced measure when both false positives and false negatives are important.

---

# 4. Binary Classification Results

The first experiment used Random Forest for binary classification.

The objective was to classify each network traffic sample as:

```text
Normal
Attack
```

The model was evaluated on the unseen testing dataset.

## 4.1 Overall Performance

| Metric    |  Score |
| --------- | -----: |
| Accuracy  | 89.36% |
| Precision | 85.22% |
| Recall    | 97.60% |
| F1-score  | 90.99% |

The model achieved an overall accuracy of **89.36%**.

The attack class achieved a recall of **97.60%**, meaning that the model detected the majority of attack samples in the testing dataset.

---

# 5. Binary Classification Report

The class-level results were:

| Class  | Precision | Recall | F1-score |
| ------ | --------: | -----: | -------: |
| Normal |      0.96 |   0.79 |     0.87 |
| Attack |      0.85 |   0.98 |     0.91 |

The results show that the model has particularly strong recall for the Attack class.

This is useful for a cybersecurity application because the model successfully identifies a large proportion of malicious traffic.

The lower recall for Normal traffic indicates that some normal network traffic is incorrectly classified as an attack.

---

# 6. Binary Confusion Matrix

The binary confusion matrix is:

| Actual / Predicted | Normal | Attack |
| ------------------ | -----: | -----: |
| Normal             | 29,325 |  7,675 |
| Attack             |  1,089 | 44,243 |

The four values can be interpreted as:

```text
True Negative  = 29,325
False Positive = 7,675
False Negative = 1,089
True Positive   = 44,243
```

Therefore:

* 29,325 normal samples were correctly classified as Normal.
* 7,675 normal samples were incorrectly classified as Attack.
* 1,089 attack samples were incorrectly classified as Normal.
* 44,243 attack samples were correctly classified as Attack.

The relatively small number of false negatives compared with true positives contributes to the high attack recall.

---

# 7. Binary Model Interpretation

The binary classification model performs well at distinguishing malicious traffic from normal traffic.

The most important observation is the high attack recall:

```text
Attack Recall = 97.60%
```

This means that the model is effective at identifying most attack samples.

However, the false-positive count indicates that some normal traffic is incorrectly identified as malicious.

For a real-world cybersecurity system, this trade-off would need to be considered carefully.

---

# 8. Initial Multiclass Classification

The second experiment involved multiclass classification.

Instead of simply predicting Normal or Attack, the model predicts the specific traffic category.

The classes are:

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

The initial multiclass Random Forest model achieved:

```text
Accuracy = 69.23%
```

---

# 9. Initial Multiclass Classification Report

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

The results demonstrate significant differences between classes.

The model performs particularly well for:

* Generic
* Reconnaissance
* Exploits
* Normal

The model performs poorly for:

* Analysis
* Backdoor
* DoS
* Fuzzers

This variation is largely associated with the class distribution of the dataset.

---

# 10. Class Distribution

The testing dataset contains:

| Class          | Number of Samples |
| -------------- | ----------------: |
| Normal         |            37,000 |
| Generic        |            18,871 |
| Exploits       |            11,132 |
| Fuzzers        |             6,062 |
| DoS            |             4,089 |
| Reconnaissance |             3,496 |
| Analysis       |               677 |
| Backdoor       |               583 |
| Shellcode      |               378 |
| Worms          |                44 |

The distribution is highly imbalanced.

The largest class is:

```text
Normal = 37,000 samples
```

The smallest class is:

```text
Worms = 44 samples
```

Therefore:

```text
Largest class / Smallest class
=
37,000 / 44
≈ 841 times
```

This demonstrates the extreme class imbalance present in the dataset.

---

# 11. Effect of Class Imbalance

The initial multiclass results indicate that the model performs considerably better on classes with more training examples.

For example:

```text
Generic:
Precision = 1.00
Recall    = 0.96
F1-score  = 0.98
```

In contrast:

```text
Analysis:
Precision = 0.01
Recall    = 0.02
F1-score  = 0.01
```

This difference demonstrates how the availability of training examples affects classification performance.

The extremely small number of samples in some categories makes it difficult for the model to learn a reliable representation of those attacks.

---

# 12. Class Weighting Experiment

To investigate whether class imbalance could be addressed through weighted training, class weights were calculated.

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

The weights give greater importance to minority classes during training.

For example, Worms received a very high weight because it has very few samples.

---

# 13. Balanced Multiclass Model Results

A balanced Random Forest model was trained using the calculated class weights.

The resulting accuracy was:

```text
Accuracy = 69.17%
```

Comparison:

| Model                             | Accuracy |
| --------------------------------- | -------: |
| Initial Multiclass Random Forest  |   69.23% |
| Balanced Multiclass Random Forest |   69.17% |

The balanced model did not improve overall accuracy.

The difference was:

```text
69.23% - 69.17% = 0.06 percentage points
```

Therefore, class weighting alone was not sufficient to significantly improve the overall multiclass performance.

This experiment is still important because it confirms that class imbalance is a major challenge that may require more advanced techniques.

---

# 14. Feature Importance

Random Forest feature importance was used to identify the most informative network traffic features.

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

The most important feature was:

```text
sbytes = 0.100678
```

The second most important feature was:

```text
smean = 0.084570
```

These features received substantially higher importance scores than many of the remaining variables.

---

# 15. Top-15 Feature Selection

The 15 highest-ranked features were selected to build a reduced-feature model.

The final features are:

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

The reduced testing matrix was verified as:

```text
X_test_top15 shape: (82332, 15)
Expected features: 15
```

This confirms that the final model receives exactly 15 features.

---

# 16. Top-15 Model Results

A new Random Forest model was trained using only the selected 15 features.

The resulting accuracy was:

```text
Accuracy = 76.82%
```

Comparison:

| Model                             |         Features | Accuracy |
| --------------------------------- | ---------------: | -------: |
| Initial Multiclass Random Forest  | Full feature set |   69.23% |
| Balanced Multiclass Random Forest | Full feature set |   69.17% |
| Top-15 Random Forest              |               15 |   76.82% |

The Top-15 model improved accuracy by:

```text
76.82% - 69.23%
= 7.59 percentage points
```

compared with the initial multiclass model.

This demonstrates that feature selection had a positive effect on the observed overall classification accuracy.

---

# 17. Top-15 Classification Report

The final Top-15 model produced:

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

The final model shows strong performance for:

```text
Generic
Normal
Reconnaissance
Exploits
```

The weakest results remain in extremely rare categories such as Analysis and Backdoor.

---

# 18. Top-15 Model Interpretation

The Top-15 model achieved a higher overall accuracy than the original multiclass model.

However, the improvement in overall accuracy should not be interpreted as meaning that every class improved.

For example, the Top-15 model achieved:

```text
Generic F1-score = 0.99
Normal F1-score = 0.85
Reconnaissance F1-score = 0.85
Exploits F1-score = 0.70
```

while rare classes such as Analysis and Backdoor remained difficult.

Therefore, the model is effective at identifying several major classes but still requires improvement for rare attack categories.

---

# 19. Prediction Function Testing

A prediction function was created to test the trained model on individual network traffic samples.

The function takes the required feature values and passes them through the trained model.

The prediction workflow is:

```text
Input Network Traffic
        ↓
Extract Required Features
        ↓
Arrange Features in Correct Order
        ↓
Apply Required Preprocessing
        ↓
Random Forest Model
        ↓
Predicted Category
        ↓
Confidence Score
```

The system returns both the predicted category and a confidence value.

Example:

```text
===== CYBER ATTACK PREDICTION =====

Predicted class: Fuzzers
Confidence: 42.16%
```

---

# 20. Prediction Test Results

The prediction function was tested using samples from the test dataset.

The observed predictions included:

| Actual         | Predicted | Confidence |
| -------------- | --------- | ---------: |
| Normal         | Fuzzers   |     42.16% |
| Reconnaissance | Exploits  |     36.67% |
| Backdoor       | Exploits  |     36.67% |
| DoS            | Exploits  |     36.67% |
| Exploits       | Exploits  |     50.65% |
| Analysis       | Exploits  |     18.10% |
| Fuzzers        | Exploits  |     57.15% |
| Worms          | Exploits  |     62.53% |
| Shellcode      | Shellcode |     90.00% |
| Generic        | Generic   |    100.00% |

The predictions demonstrate that the model can successfully identify some classes with high confidence.

For example:

```text
Actual: Shellcode
Predicted: Shellcode
Confidence: 90.00%
```

and:

```text
Actual: Generic
Predicted: Generic
Confidence: 100.00%
```

However, several minority attack samples were incorrectly classified as other categories.

This behavior is consistent with the class imbalance observed during dataset analysis.

---

# 21. Prediction Confidence

The prediction system provides a confidence score for each prediction.

The confidence represents the probability assigned by the Random Forest classifier to the predicted class.

For example:

```text
Generic → 100.00%
Shellcode → 90.00%
```

indicates that the model assigned a high probability to those predictions.

Lower confidence values indicate greater uncertainty.

For example:

```text
Analysis → Exploits
Confidence = 18.10%
```

indicates that the model has low confidence in the prediction.

Confidence values should therefore be used as an indicator of model certainty rather than as a guarantee of correctness.

---

# 22. Final Model Verification

The final model input requirements were verified before prediction testing.

The verification showed:

```text
X_test_top15 shape: (82332, 15)
Expected features: 15
```

The final feature list was:

```text
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

This confirms that the test data contains exactly the 15 features expected by the final model.

---

# 23. Overall Model Comparison

The complete model comparison is:

| Model                             | Task             | Features |   Accuracy |
| --------------------------------- | ---------------- | -------: | ---------: |
| Binary Random Forest              | Normal vs Attack |     Full | **89.36%** |
| Initial Multiclass Random Forest  | Attack Category  |     Full | **69.23%** |
| Balanced Multiclass Random Forest | Attack Category  |     Full | **69.17%** |
| Top-15 Random Forest              | Attack Category  |       15 | **76.82%** |

The results show three important observations.

### Observation 1 — Binary classification performs better

The binary model achieved:

```text
89.36%
```

because it only needs to distinguish between two classes.

### Observation 2 — Multiclass classification is more difficult

The initial multiclass model achieved:

```text
69.23%
```

because it must distinguish between ten categories.

### Observation 3 — Feature selection improved the multiclass model

The Top-15 model achieved:

```text
76.82%
```

which is an improvement of:

```text
7.59 percentage points
```

over the initial multiclass model.

---

# 24. Best Performing Model

The best model depends on the prediction task.

For binary detection:

```text
Best Model:
Binary Random Forest

Accuracy:
89.36%
```

For multiclass attack-category prediction:

```text
Best Model:
Top-15 Random Forest

Accuracy:
76.82%
```

Therefore, the Top-15 Random Forest is selected as the primary multiclass model for the prediction component of the project.

---

# 25. Key Findings

The experiments produced the following major findings.

## Finding 1

Random Forest can effectively distinguish normal traffic from attack traffic.

The binary model achieved an attack recall of:

```text
97.60%
```

## Finding 2

Multiclass attack classification is considerably more difficult than binary classification.

The initial multiclass accuracy was:

```text
69.23%
```

## Finding 3

The dataset contains severe class imbalance.

The largest class contains:

```text
37,000 samples
```

while the smallest contains:

```text
44 samples
```

## Finding 4

Class weighting alone did not significantly improve overall accuracy.

```text
Initial Model = 69.23%
Balanced Model = 69.17%
```

## Finding 5

Feature importance analysis identified 15 highly informative features.

## Finding 6

The Top-15 model achieved:

```text
76.82% accuracy
```

which is higher than the original multiclass model.

## Finding 7

Rare attack categories remain difficult to classify accurately.

This indicates that future work should focus on better handling of minority classes.

---

# 26. Limitations of the Results

The reported results should be interpreted with the following limitations.

### Dataset imbalance

The severe imbalance between attack categories affects minority-class performance.

### Rare classes

Some classes contain very few examples, limiting the model's ability to learn their patterns.

### Dataset generalization

The model is evaluated using UNSW-NB15 and may not perform identically on traffic from a different network environment.

### Accuracy limitation

Overall accuracy does not fully represent performance on imbalanced datasets.

For cybersecurity applications, class-level precision, recall, and F1-score are also important.

### Prediction confidence

Confidence values represent model probabilities and should not be treated as absolute certainty.

---

# 27. Future Improvements

Future experiments can focus on improving minority-class detection.

Possible approaches include:

* SMOTE
* Oversampling
* Undersampling
* Synthetic attack generation
* Advanced class weighting
* XGBoost
* LightGBM
* Neural Networks
* Deep Learning
* Ensemble methods
* Explainable AI

The final system can also be integrated with real-time network traffic monitoring.

---

# 28. Final Experimental Summary

The complete experimental process produced the following results:

```text
====================================================
          CYBER ATTACK RISK PREDICTOR
             EXPERIMENTAL RESULTS
====================================================

Binary Classification
---------------------
Accuracy  : 89.36%
Precision : 85.22%
Recall    : 97.60%
F1-score  : 90.99%

Initial Multiclass Classification
----------------------------------
Accuracy  : 69.23%

Balanced Multiclass Classification
-----------------------------------
Accuracy  : 69.17%

Top-15 Feature Classification
-----------------------------
Accuracy  : 76.82%

Final Feature Count
-------------------
15 features

Number of Test Samples
----------------------
82,332

Number of Predicted Classes
---------------------------
10
====================================================
```

---

# 29. Final Conclusion

The experimental results demonstrate that Random Forest is capable of performing both binary and multiclass network traffic classification using the UNSW-NB15 dataset.

The binary classification model achieved **89.36% accuracy** with an attack recall of **97.60%**, demonstrating strong capability in distinguishing malicious traffic from normal traffic.

The initial multiclass model achieved **69.23% accuracy**. The class-weighted model achieved **69.17%**, showing that simple class weighting did not significantly improve overall performance.

Feature importance analysis was then used to identify the 15 most informative features.

The resulting Top-15 Random Forest model achieved **76.82% accuracy**, representing an improvement of **7.59 percentage points** over the initial multiclass model while reducing the number of model input features.

The results also show that common and well-represented categories such as Generic, Normal, Exploits, and Reconnaissance can be classified more effectively than extremely rare categories such as Analysis and Backdoor.

Therefore, the current model provides a strong foundation for the Cyber Attack Risk Predictor, while future improvements should focus on minority-class learning, real-time traffic integration, explainable predictions, and more advanced machine learning techniques.