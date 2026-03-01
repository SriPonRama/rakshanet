from flask import Flask, request, jsonify
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    @app.get("/health")
    def health():
        return jsonify({"status": "ok", "service": "rakshanet-ai-service"})

    @app.post("/predict-risk")
    def predict_risk():
        payload = request.get_json(silent=True) or {}
        location = payload.get("location") or {}
        incident_type = payload.get("incidentType", "unknown")
        indicators = payload.get("severityIndicators") or {}

        population_density = float(indicators.get("populationDensity", 0))
        infrastructure_score = float(indicators.get("infrastructureScore", 0))
        weather_severity = float(indicators.get("weatherSeverity", 0))

        raw_score = (
            population_density * 0.4
            + (10 - infrastructure_score) * 0.3
            + weather_severity * 0.3
        )
        score = max(0.0, min(100.0, raw_score))

        if score < 30:
            level = "low"
        elif score < 60:
            level = "medium"
        elif score < 85:
            level = "high"
        else:
            level = "critical"

        response = {
            "incidentType": incident_type,
            "location": location,
            "riskScore": round(score, 2),
            "riskLevel": level,
            "recommendedActions": [
                "Verify field reports and sensor data",
                "Pre-position rescue teams and medical units" if level in ("high", "critical") else "Keep teams on standby",
                "Notify local authorities and NGOs",
            ],
        }
        return jsonify(response)

    @app.post("/analyze-damage")
    def analyze_damage():
        payload = request.get_json(silent=True) or {}
        image_b64 = payload.get("imageBase64")

        if not image_b64:
            return jsonify({"error": "imageBase64 is required"}), 400

        length = len(image_b64)
        if length < 50000:
            severity = "minor"
        elif length < 150000:
            severity = "moderate"
        else:
            severity = "severe"

        return jsonify(
            {
                "damageSeverity": severity,
                "confidence": 0.75,
                "notes": "Heuristic placeholder model. Replace with real CNN in production.",
            }
        )

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

