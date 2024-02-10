from flask import jsonify, request, Blueprint
import mysql.connector
import constant

grocery_app = Blueprint('grocery', __name__, template_folder='templates')

db_config = {
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"grocery",
}

conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

@grocery_app.route(constant.GROCERY_URL + '/list', methods=['GET'])
def grocery_list():
    cursor.execute("SELECT p_id, name, description, category, quantity, price FROM products WHERE deleted = 0")
    products = cursor.fetchall()

    keys = ["p_id", "name", "description", "category", "quantity", "price"]
    products_dict_list = [dict(zip(keys, product)) for product in products]

    return jsonify(products_dict_list)

@grocery_app.route(constant.GROCERY_URL + '/add', methods=['POST'])
def add_grocery():
    name = request.json['name']
    description = request.json['description']
    category = request.json['category']
    quantity = request.json['quantity']
    price = request.json['price']

    cursor.execute("INSERT INTO products (name, description, category, quantity, price) VALUES (%s, %s, %s, %s, %s)",(name, description, category, quantity, price))
    conn.commit()
    return {"message":"item added successfully"}

@grocery_app.route(constant.GROCERY_URL + '/get/<int:id>', methods=['GET'])
def grocery_list_id(id):
    cursor.execute("SELECT * FROM products WHERE p_id = %s and deleted = 0", (id,))
    product = cursor.fetchone()

    if product:
        result  = {
            'p_id':product[0],
            'name':product[1],
            'description': product[2],
            'category': product[3],
            'quantity': product[4],
            'price': product[5]
        }
        return (result)
    else:
        return jsonify({"error":"product not found"}), 404

@grocery_app.route(constant.GROCERY_URL + '/grocery-update/<int:p_id>', methods=['PUT'])
def update_grocery(p_id):
    try:
        cursor.execute("SELECT * FROM products WHERE p_id = %s", (p_id,))
        existing_item = cursor.fetchone()

        if not existing_item:
            return jsonify({"message": "product not found"}), 404

        quantity = request.json['quantity']
        price = request.json['price']
        cursor.execute("UPDATE products SET quantity = %s, price = %s WHERE p_id = %s", (quantity, price, p_id))
        conn.commit()

        return jsonify({"message":"item updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@grocery_app.route(constant.GROCERY_URL + '/grocery-delete/<int:p_id>', methods=['DELETE'])
def delete_grocery(p_id):
    try:
        cursor.execute("SELECT * FROM products WHERE p_id = %s", (p_id,))
        existing_product = cursor.fetchone()

        if not existing_product:
            return jsonify({"message": "Product not found"}), 404

        cursor.execute("UPDATE products SET deleted = 1 WHERE p_id = %s", (p_id,))
        conn.commit()
        return jsonify({"message": "Product removed successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@grocery_app.route(constant.GROCERY_URL + '/admin-grocery-list', methods=['GET'])
def admin_grocery_list():
    cursor.execute("SELECT p_id, name, description, category, quantity, price FROM products")
    products = cursor.fetchall()

    items = ["p_id", "name", "description", "category", "quantity", "price"]
    products_list = [dict(zip(items, product)) for product in products]

    return jsonify(products_list)

# @grocery_app.route(constant.GROCERY_URL + '/manage-grocery', methods=['GET'])
# def dashboard():
#     cursor.execute("SELECT p_id, name, description, category, quantity, price FROM products where deleted = 0")
#     products = cursor.fetchall()
#     return jsonify(products)


