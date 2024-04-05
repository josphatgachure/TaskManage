import mysql.connector


__cnx = None #creating global variable to avoid running multiple connections if one has already been established

def get_Sql_connection():
    global __cnx
    if __cnx is None: #only create connection when none has been created
        __cnx = mysql.connector.connect(user='root', password='1234',
                                host='127.0.0.1',
                                database='todos')

        return __cnx
    
