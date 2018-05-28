from flask import session
from flask import request
from flask_restful import Resource 
import re
import time
import json
import hashlib
import config
import resource_types




# Add_post 
class Tester(resource_types.Authenticated):

    def __init__(self):
        pass

    def get_authenticated( self ):
        return { "debug_username" : session.get("username", False) }

    def post_authenticated( self ):
        return { "debug_username" : session.get("username", False) }


########

import mysql.connector 
# This will interact with the actual database.
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
        query = "SELECT passwordhash FROM users WHERE username=\"" + username +"\""
        cursor = self.connection["authenticator"].cursor()
        cursor.execute( query )    
        return cursor.next()[0] == hashed and cursor.arraysize == 1



    def post_content( self, content ):
        # we need to verify the blog data is correct
        if type( content ) != type( BlogPost() ) or not content.verify():
            return False
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




if __name__ == "__main__":
    hndb = HillnetworkDatabase()

    test = BlogPost()
    test.set_title("testing ")
    test.set_content(" this is test content ")
    hndb.post_content( test )
    test = BlogPost()
    test.set_title("testing 2")
    test.set_content(" this is test content 2")
    hndb.post_content( test )
    debug = hndb.fetch_content( 0, int(time.time()) )



