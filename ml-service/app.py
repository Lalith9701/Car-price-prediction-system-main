from flask import Flask, request, jsonify
from price_engine import predict_price

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    data = request.json

    price = predict_price(
        data.get("brand"),
        data.get("model"),
        int(data.get("year", 2015)),
        int(data.get("km_driven", 50000)),
        data.get("fuel", "Petrol"),
        data.get("transmission", "Manual"),
        int(data.get("owner", 1))
    )

    return jsonify({
        "predicted_price": price,
        "currency": "INR"
    })

@app.route("/")
def home():
    return "Car Price Prediction Service Running 🚗"

if __name__ == "__main__":
    app.run(port=8000, debug=True)