
from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd


app = Flask(__name__)

model = joblib.load('linear_regression_model.pkl')
model = joblib.load('walls_data.pkl')

@app.route('/predict', methods=['POST','GET'])
def index():
    # data = request.get_json()
    # input_data = data.get('input_data', '')
    input_data = pd.DataFrame([[3, 2, 1500, 4000, 1, 0, 0, 3]], columns=['bedrooms', 'bathrooms', 'sqft_living', 'sqft_lot', 'floors', 'waterfront', 'view', 'condition'])
    

    predictions = model.predict(input_data)
    print("Predicted Price:", predictions[0]) 

    

    return jsonify({'prediction': float(predictions[0])})
    # return jsonify({'prediction': predictions})

if __name__ == "__main__":
    app.run(port=5000, debug=True)