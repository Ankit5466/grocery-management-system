from flask import request,jsonify, Blueprint
from datetime import datetime
import mysql.connector
import constant

grocery_app = Blueprint('user', __name__, template_folder='templates')

db_config = {
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"grocery",
}

conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

@grocery_app.route(constant.USER_URL + '/register', methods=['POST'])
def register():
    try:
        user = request.get_json()
        name = user['name']
        email = user['email']
        phone = user['phone']
        password = user['password']

        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"message": "User already registered"}), 400

        cursor.execute("INSERT INTO users (name, email, phone, password) VALUES (%s, %s, %s, %s)",
                       (name, email, phone, password))
        conn.commit()
        return jsonify({"message": "Thank you for registration"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@grocery_app.route(constant.USER_URL +'/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data['name']
    email = data['email']
    phone = data['phone']
    subject = data['subject']
    message = data['message']
    created_on = datetime.now()

    cursor.execute(
        "INSERT INTO contact (name, email, phone, subject, message, created_on) VALUES (%s, %s, %s, %s, %s, %s)",
        (name, email, phone, subject, message, created_on))
    conn.commit()
    return {"message":"Thanks for submission"}

