from flask import Flask, request, jsonify
from flask_cors import CORS
from sql_connection import get_Sql_connection
import connect_db

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


connection = get_Sql_connection()

@app.route('/gettasks', methods=['GET'])
def get_tasks():
    tasks = connect_db.get_all_tasks(connection)
    response = jsonify(tasks)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

#get one task
@app.route('/gettasks/<int:task_id>', methods=['GET'])
def get_task_by_id(task_id):
    task = connect_db.get_task_by_id(connection, task_id)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    else:
        return jsonify(task)

@app.route('/addtask', methods=['POST'])
def add_task():
    data = request.json  # JSON format
    task_id = connect_db.insert_new_task(connection, data)
    response = jsonify({
        'task_id': task_id
    })
    return response

@app.route('/updatetask/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json  # JSON format
    new_status = data.get('status')
    connect_db.update_task_status(connection, task_id, new_status)
    response = jsonify({
        'message': f'Task with ID {task_id} updated successfully.'
    })
    return response

@app.route('/deletetask/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    connect_db.delete_task(connection, task_id)
    response = jsonify({
        'message': f'Task with ID {task_id} deleted successfully.'
    })
    return response

if __name__ == "__main__":
    app.run(debug=True)
