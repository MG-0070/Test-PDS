import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app) 

def allowed_file(filename):
    allowed_extensions = {'xlsx', 'xls'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions


@app.route("/uploadConfigExcel", methods=["POST"])
def uploadConfigExcel():
    data = {}
    try:
        file = request.files['uploadFile']

       
        if file and allowed_file(file.filename):
            if os.path.exists("Data_1.xlsx"):
                os.remove("Data_1.xlsx")  
            file.save('Data_1.xlsx') 
            data['status'] = 1  
        else:
            data['status'] = 0  
            data['message'] = 'Unsupported file type'

    except Exception as e:
        print("Error:", e)
        data['status'] = 0 
        data['message'] = 'Error uploading file'

    return jsonify(data)  

if __name__ == "__main__":
    app.run(debug=True)
