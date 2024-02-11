from flask import Flask, render_template, request, redirect, url_for, jsonify
from datetime import datetime
import mysql.connector


import grocery
import user

app = Flask(__name__)
app.secret_key = 'super-secret-key'
app.config['UPLOAD_FOLDER'] = 'C:\\Users\\Ankit Sharma\\OneDrive\\Desktop\\endgame\\Project\\finalYearProject\\Grocery\\static\\image_file'


# connection
db_config = {
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"grocery",
}

conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/groceries')
def groceries():
    return render_template("groceries.html")

@app.route('/addgroceries')
def addgroceries():
    return render_template("addgroceries.html")

@app.route('/getview')
def productview():
    return render_template("getview.html")

@app.route('/cart')
def cart():
    return render_template("cart.html")

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/register')
def register():
    return render_template("register.html")

@app.route('/contact')
def contact():
    return render_template("contact.html", success=True)

@app.route('/dashboard')
def dashboard():
    cursor.execute("SELECT p_id, name, description, category, quantity, price FROM products WHERE deleted = 0")
    products = cursor.fetchall()
    return render_template('dashboard.html', products=products)

@app.route('/edit/<int:p_id>', methods=['GET'])
def edit(p_id):
    cursor.execute("SELECT name, description, category, quantity, price FROM products WHERE p_id = %s AND deleted = 0", (p_id,))
    product = cursor.fetchone()
    if product:
        return render_template("edit.html", p_id=p_id, product=product)
    else:
        return "Product not found", 404

app.register_blueprint(user.grocery_app)
app.register_blueprint(grocery.grocery_app)
app.run(debug=True)
