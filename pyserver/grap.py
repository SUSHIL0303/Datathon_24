from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
import os

app = Flask(__name__)
CORS(app)  # Enable CORS
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return "Hello, World!"

def save_plot(filename):
    plt.savefig(filename)
    plt.close()  # Close the plot to free up memory

@app.route('/plot', methods=['POST'])
def plot_chart():
    try:
        # Get uploaded CSV file
        csv_file = request.files['csv_file']
        
        # Save CSV file temporarily
        csv_filename = os.path.join(app.config['UPLOAD_FOLDER'], 'temp.csv')
        csv_file.save(csv_filename)

        attribute1 = request.form['attribute1']
        attribute2 = request.form['attribute2']

        # Read the entire dataset
        data = pd.read_csv(csv_filename)
        
        if attribute1 == attribute2:
            return "Attribute 1 and Attribute 2 should be different", 400

        # Check if the attributes exist in the dataset
        if attribute1 not in data.columns:
            return f"Attribute '{attribute1}' not found in the dataset", 400

        if attribute2 not in data.columns:
            return f"Attribute '{attribute2}' not found in the dataset", 400

        # Use seaborn's countplot for counting occurrences of categories
        plt.figure(figsize=(18, 10))
        sns.countplot(data=data, x=attribute1, hue=attribute2)
        plt.xlabel(attribute1)
        plt.ylabel("Count of " + attribute2)
        plt.title('Count of ' + attribute2 + ' for each ' + attribute1)
        plt.xticks(rotation=45)  # Rotate x-axis labels if needed
        plt.tight_layout()  # Adjust layout to prevent clipping of labels
        plt.legend(title=attribute2)
        
        # Save plot as image
        image_filename = os.path.join(app.config['UPLOAD_FOLDER'], 'plot.png')
        save_plot(image_filename)

        # Debug: Confirm file saving
        if os.path.exists(image_filename):
            print(f"Plot saved successfully at {image_filename}")

        # Remove the temporary CSV file
        os.remove(csv_filename)

        return jsonify({'plot_filename': 'plot.png'})
    except Exception as e:
        return str(e), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    app.run(debug=True)
