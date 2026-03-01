# RakshaNet AI Microservice

Flask-based AI service for disaster risk prediction and damage analysis.

## Setup

```bash
pip install -r requirements.txt
```

## Run

```bash
python app.py
```

Runs on http://localhost:8000

## Endpoints

### POST /predict-risk
Predicts disaster risk based on indicators.

**Request:**
```json
{
  "incidentType": "flood",
  "location": {"lat": 13.08, "lng": 80.27},
  "severityIndicators": {
    "populationDensity": 7,
    "infrastructureScore": 5,
    "weatherSeverity": 8
  }
}
```

**Response:**
```json
{
  "riskScore": 72.5,
  "riskLevel": "high",
  "recommendedActions": ["..."]
}
```

### POST /analyze-damage
Analyzes damage from base64 image.

**Request:**
```json
{
  "imageBase64": "base64_string..."
}
```

**Response:**
```json
{
  "damageSeverity": "moderate",
  "confidence": 0.75,
  "notes": "..."
}
```
