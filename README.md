# JobComPas — AI Engineer Module

Job Category Classification using Deep Learning (TensorFlow). Classifies job roles into 9 categories based on skill sets, powered by a custom-built neural network and served via REST API.

---

## Overview

JobComPas is an AI-powered job classification system that predicts a job's category based on its required skill set. The model is built from scratch using TensorFlow Functional API, incorporating custom components including a custom layer, loss function, and training callback. Model inference is exposed through a FastAPI REST endpoint with optional Generative AI insight via the Anthropic API.

---

## Project Structure

```
JobComPas/
│
├── Ai_Engineer_JobCompas_NewModel.ipynb  # Main notebook
├── dataset_final.csv                     # Input dataset (job_id, job_title, job_skill_set)
│
├── job_classifier.keras                  # Trained model (Keras format)
├── job_classifier_savedmodel/            # TF SavedModel for TF Serving
├── vectorizer_config.json                # TF-IDF config for inference
│
├── api.py                                # FastAPI REST server
├── dataset_final.json                    # Enriched dataset for Fullstack team
├── model_report.json                     # Model performance summary
├── training_log.json                     # Per-epoch training log
├── logs/fit/                             # TensorBoard logs
│
├── eda_distribution.png                  # EDA visualization
├── training_curves.png                   # Accuracy & loss curves
└── confusion_matrix.png                  # Confusion matrix on test set
```

---

## Getting Started

### 1. Install Dependencies

```bash
pip install tensorflow scikit-learn pandas numpy fastapi uvicorn anthropic nest-asyncio
```

### 2. Run the Notebook

Open and run all cells in `Ai_Engineer_JobCompas_NewModel.ipynb` sequentially. The notebook will load and preprocess `dataset_final.csv`, engineer features using TF-IDF, train the classification model, export model artifacts, and generate the REST API code (`api.py`).

### 3. Run the REST API

```bash
uvicorn api:app --host 0.0.0.0 --port 8000 --reload
```

To enable AI-powered skill gap insights, set the Anthropic API key beforehand:

```bash
export ANTHROPIC_API_KEY=your_api_key_here
```

---

## Dataset

| Column | Description |
| `job_id` | Unique job identifier |
| `job_title` | Job title (used for label assignment) |
| `job_skill_set` | List of required skills (stored as string) |

The model classifies jobs into 9 categories:

| ID | Category |
|---|---|
| 0 | Human Resources |
| 1 | Customer Service |
| 2 | Sales & Business Development |
| 3 | Finance & Accounting |
| 4 | Information Technology |
| 5 | Operations |
| 6 | Healthcare |
| 7 | Education |
| 8 | Design & Creative |

---

## Model Architecture

Built with TensorFlow Functional API as `JobCategoryClassifier`:

```
Input (TF-IDF features, dim=1500)
  Dense(512) + BatchNorm + Dropout(0.4)
  NoisyDenseLayer(256)        <- Custom Layer
  Dropout(0.4)
  NoisyDenseLayer(128) + Residual Add + LayerNorm
  Dropout(0.3)
  Dense(64) + Dropout(0.2)
  Dense(9, softmax)           <- Output
```

---

## Custom Components

**NoisyDenseLayer** is a custom Keras layer that applies a Dense transformation with BatchNormalization, injects learnable Gaussian noise during training, and applies L2 normalization on the output. This regularizes the embedding space and reduces overfitting.

**LabelSmoothingCCE** is a custom loss function extending Categorical Cross-Entropy with label smoothing (`smoothing=0.10`). It redistributes a small fraction of probability mass uniformly across all classes, reducing the model's tendency to become overconfident.

**WarmUpCosineDecayCallback** is a custom callback that manages the learning rate schedule: a linear warm-up over the first 5 epochs followed by cosine annealing down to a minimum LR. It is designed to work directly with a passed optimizer instance, making it compatible with custom `GradientTape` training loops. It also logs per-epoch metrics to `training_log.json`.

---

## Training Pipeline

| Parameter | Value |
| Optimizer | Adam |
| Loss | LabelSmoothingCCE (smoothing=0.10) |
| Epochs | 80 (early stopping, patience=15) |
| Batch Size | 32 |
| LR Schedule | Warm-up (1e-5 to 1e-3) + Cosine Decay (to 1e-6) |
| Train/Val/Test Split | 70% / 15% / 15% (stratified) |

Training is implemented using a fully custom `tf.GradientTape` loop with L2 regularization on kernel weights, gradient clipping (`clip_norm=1.0`), and TensorBoard scalar logging per epoch.

---

## Model Performance

| Metric | Target | Result |
| Test Accuracy | >= 85% | See `model_report.json` |
| Normalized MAE | <= 0.02 | See `model_report.json` |

---

## REST API Endpoints

Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
| GET | `/` | API info and version |
| GET | `/health` | Health check |
| GET | `/labels` | List all category labels |
| POST | `/predict` | Predict single job category |
| POST | `/predict/batch` | Predict multiple jobs at once |

### Example Request

```bash
curl -X POST "http://localhost:8000/predict" \
     -H "Content-Type: application/json" \
     -d '{"skills": ["Python", "Machine Learning", "TensorFlow", "SQL"], "job_title": "Data Scientist"}'
```

### Example Response

```json
{
  "predicted_category": "Information Technology",
  "category_id": 4,
  "confidence": 0.9213,
  "all_probabilities": {
    "Information Technology": 0.9213,
    "Finance & Accounting": 0.0312
  },
  "ai_insight": "These skills are core to data science roles within IT. Consider adding MLOps and cloud deployment experience to advance further."
}
```

---

## Generative AI Feature

When `ANTHROPIC_API_KEY` is set, the `/predict` endpoint automatically generates a short career insight using Claude (`claude-sonnet-4-20250514`), explaining why the predicted category fits the given skill set and suggesting one growth area.

A standalone `get_skill_gap_analysis()` function is also available in the notebook for deeper analysis, including category fit explanation, 3 in-demand skills to add, and a relevant certification suggestion.

---

## Deliverables

| File | Description |
| `job_classifier.keras` | Production model in Keras format |
| `job_classifier_savedmodel/` | TF SavedModel for TF Serving |
| `vectorizer_config.json` | TF-IDF vocabulary and IDF values for inference |
| `api.py` | FastAPI REST server |
| `dataset_final.json` | Enriched dataset with predictions for Fullstack |
| `model_report.json` | Model performance and metadata |
| `training_log.json` | Per-epoch metrics log |
| `logs/fit/` | TensorBoard training logs |

---

## Monitoring with TensorBoard

```bash
tensorboard --logdir logs/fit --port 6006
```

Open `http://localhost:6006` to view training metrics. The following scalars are tracked: `loss`, `accuracy`, `val_loss`, `val_accuracy`, and `learning_rate` per epoch.

---

## Architecture Checklist

- [x] TensorFlow Functional API
- [x] Custom Layer (NoisyDenseLayer)
- [x] Custom Loss (LabelSmoothingCCE)
- [x] Custom Callback (WarmUpCosineDecayCallback)
- [x] GradientTape training loop
- [x] TensorBoard integration
- [x] FastAPI REST API
- [x] Generative AI feature (Anthropic Claude)
- [x] .keras + SavedModel export
- [x] JSON export for Fullstack team

---

## Team

| Role | Contribution |
| AI Engineer | Model development, custom components, API, inference pipeline |
| Data Science | Dataset preparation, EDA, feature engineering, TF-IDF preprocessing |
| Fullstack | Consumes `dataset_final.json` and REST API endpoints |
