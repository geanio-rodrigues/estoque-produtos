from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

DATA_FILE = "js/data.json"

# Função para carregar os dados do JSON
def load_data():
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"users": [], "products": [], "suppliers": []}

# Função para salvar os dados no JSON
def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

# Função para gerar o próximo ID automaticamente
def generate_id(items):
    return max([item["id"] for item in items], default=0) + 1

# Rota para adicionar dados ao JSON
@app.route("/add", methods=["POST"])
def add_data():
    data = load_data()  # Carrega os dados existentes no JSON
    new_entry = request.json  # Recebe os dados do front-end

    if "type" not in new_entry:
        return jsonify({"message": "Tipo de dado não informado"}), 400

    new_type = new_entry["type"]
    new_entry.pop("type", None)  # Remove o campo "type" antes de salvar no JSON

    # Adiciona ID automático e garante que phone seja um número
    if new_type == "users":
        new_entry["id"] = generate_id(data["users"])
        new_entry["phone"] = int(new_entry["phone"])  
        data["users"].append(new_entry)

    elif new_type == "products":
        new_entry["id"] = generate_id(data["products"])
        new_entry["quantity"] = int(new_entry["quantity"])  
        new_entry["purchase_price"] = float(new_entry["purchase_price"])  
        new_entry["supplier_id"] = int(new_entry["supplier_id"]) 
        data["products"].append(new_entry)

    elif new_type == "suppliers":
        new_entry["id"] = generate_id(data["suppliers"])
        new_entry["phone"] = int(new_entry["phone"])  # Converte para número
        data["suppliers"].append(new_entry)

    else:
        return jsonify({"message": "Tipo inválido"}), 400

    save_data(data)  # Salva no arquivo data.json
    return jsonify({"message": "Dados cadastrados com sucesso!", "data": new_entry}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)
