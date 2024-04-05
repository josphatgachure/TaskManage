from sql_connection import get_Sql_connection


#getting all the tasks
def get_all_tasks(connection):
    cursor = connection.cursor()
    query = ("SELECT task_id, title, description, due_date, status FROM Task;")
    cursor.execute(query)

    response = []

    for (task_id, title, description, due_date, status) in cursor:
        response.append(
            {
                'task_id': task_id,
                'title': title,
                'description': description,
                'due_date': due_date.strftime('%Y-%m-%d'),  # Convert date object to string
                'status': status
            }
        )

    return response

    #getting one task

def get_task_by_id(connection, task_id):
    cursor = connection.cursor()
    query = ("SELECT task_id, title, description, due_date, status FROM Task WHERE task_id = %s")
    cursor.execute(query, (task_id,))
    task = cursor.fetchone()
    if task:
        return {
            'task_id': task[0],
            'title': task[1],
            'description': task[2],
            'due_date': task[3].strftime('%Y-%m-%d'),  # Convert date object to string
            'status': task[4]
        }
    else:
        return None


#Inserting new tasks

def insert_new_task(connection, task):
    cursor = connection.cursor()
    query = ("INSERT INTO Task "
             "(title, description, due_date, status) "
             "VALUES (%s, %s, %s, %s)")

    data = (task['title'], task['description'], task['due_date'], task['status'])
    cursor.execute(query, data)
    connection.commit()

    return cursor.lastrowid

def delete_task(connection, task_id):
    cursor = connection.cursor()
    query = ("DELETE FROM Task WHERE task_id = %s")
    cursor.execute(query, (task_id,))
    connection.commit()

# connect_db.py

def update_task_status(connection, task_id, new_status):
    cursor = connection.cursor()
    query = ("UPDATE Task SET status = %s WHERE task_id = %s")
    cursor.execute(query, (new_status, task_id))
    connection.commit()

if __name__ == "__main__":
    connection = get_Sql_connection()  # Function available for connecting with the database
    print(get_all_tasks(connection))
    
