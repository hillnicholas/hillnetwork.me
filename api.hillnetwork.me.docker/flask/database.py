import config
import time
import hashlib
import re
import json
import mysql.connector 

import blog

# This class holds all methods that interact with the actual database.


class HillnetworkDatabase:

    # creates the connections for 3 different users. One is for authentication,
    # one is for reading blog content and one is for editing/adding blog content.
    def __init__( self ):
        self.DATABASE_HOST = config.DATABASE_HOST
        self.connection = dict()
        for user in ["authenticator", "content_read", "content_edit"]:
            conn = mysql.connector.connect(
                                        user=user,
                                        password=json.load( open( config.KEY_FILE ) )["hillnetworkdb"][user] ,
                                        host=self.DATABASE_HOST,
                                        database="hillnetworkdb"
            )   
            self.connection[user] = conn



    # verifies login information from the user table
    def verify_login( self, username, password ):
        crypt = hashlib.sha512()
        crypt.update( password )
        hashed = crypt.hexdigest()
        if not re.search( config.USERNAME_REGEX, username ):
            return False
        cursor = self.connection["authenticator"].cursor()
        query = ("SELECT passwordhash FROM users WHERE username= %s ;")
        cursor.execute( query, (username,) ) 
        results = cursor.fetchall()  
        return len(results) == 1 and results[0] == hashed


    # post content to the database. The timestamp is recorded on the database.
    def post_content( self, content ):
        # we need to verify the blog data is correct
        if not content.verify():
            return False
        print "test"
        current_timestamp = time.time()  

        # connect to database and insert. We're just going to use the timestamp and call the  
        # SQL function to convert it for the database field. (don't do more work than we need to)
        cursor = self.connection["content_edit"].cursor()
        query = "INSERT INTO blog ( title, content ) VALUES ( %s, %s );"
        cursor.execute( query, (
                        content.get_title(),         # title 
                        content.get_content()        # JSON content
                    ))
        self.connection["content_edit"].commit()
        cursor.close()
        return True



    # get content between two valid timestamps. 
    def fetch_content( self, start_timestamp, end_timestamp ):
        # validate start_timestamp and end_timestamp
        if start_timestamp < 0 or \
            start_timestamp > time.time() or \
            end_timestamp < 0 or \
            end_timestamp > time.time() or \
            type( start_timestamp ) != type( int() ) or \
            type( end_timestamp ) != type( int() ):
            return False

        cursor = self.connection["content_read"].cursor()
        query = "SELECT * FROM blog WHERE UNIX_TIMESTAMP( post_time ) BETWEEN %s AND %s"
        cursor.execute( query, ( start_timestamp, end_timestamp ) )
        return list( BlogPost(
                 datetime=result[1],
                 title=result[2],
                 content=result[3]
                ) for result in cursor )


    # fetches the most recent posts
    def fetch_most_recent( self, limit ):
        # set boundaries
        if limit < 0 or limit > 20:
            return None
        cursor = self.connection["content_read"].cursor()
        query = "SELECT * FROM blog ORDER BY post_time DESC LIMIT %s"
        cursor.execute( query, ( start_timestamp, end_timestamp ) )
        return list( BlogPost(
                 datetime=result[1],
                 title=result[2],
                 content=result[3]
                ) for result in cursor )
