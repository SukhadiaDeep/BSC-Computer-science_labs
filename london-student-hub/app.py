from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# 1. Connect to the database you made in MySQL earlier
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="", # Keep as "" if you didn't set a password in brew
    database="student_hub_db"
)

# 2. This is the 'Route' that your JavaScript is looking for
@app.route('/add_deal', methods=['POST'])
def add_deal():
    data = request.json
    cursor = db.cursor()
    query = "INSERT INTO deals (store_name, description) VALUES (%s, %s)"
    cursor.execute(query, (data['store_name'], data['description']))
    db.commit()
    return jsonify({"message": "Deal saved successfully!"}), 201

# Add this new route to fetch deals
@app.route('/get_deals', methods=['GET'])
def get_deals():
    cursor = db.cursor(dictionary=True) # dictionary=True makes it easy for JavaScript to read
    cursor.execute("SELECT * FROM deals ORDER BY created_at DESC")
    deals = cursor.fetchall()
    return jsonify(deals), 200

# 3. This MUST be at the very bottom
if __name__ == '__main__':
    app.run(port=5000, debug=True)