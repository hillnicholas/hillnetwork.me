from flask import session
from flask import request
from flask_restful import Resource 
import resource_types
import re
import json
import hashlib
import config

PASSWORD_REGEX = "[A-Za-z0-9@#$%^&+=]{8,}"
USERNAME_REGEX = "[a-zA-Z0-9@\._]+"


# This module will be responsible for starting sessions. 
# Avaliable under /auth/login
class Authenticator( resource_types.Public ):

    def post( self ):
        
        if request.content_type != "application/json":
            return self._failed( message="bad content-type")

        credentials = request.get_json()
       
        username = credentials.get("username", False )
        password = credentials.get("password", False )


        if set(credentials.keys()) != set(["username","password"]):
            return self._failed( message="invalid/missing parameters")

        valid = re.search( USERNAME_REGEX, username ) and \
                        re.search( PASSWORD_REGEX, password )

        if not valid:
            return self._failed( message="invalid username or password.")
       
        if self._check_login( username, password ):
            return self._passed( username )
        else:
            return self._failed( message="invalid username or password.")


    # do get to test if logged in
    def get( self ):
        return { "logged_in" : bool( session.get("username", False) ) }

    # checks the login. Placeholder for database if I use one later 
    def _check_login( self, username, password ):

        crypt = hashlib.sha512()
        crypt.update( password )
        hashvalue = crypt.hexdigest()
        print json.load(open(config.KEY_FILE))["blogcreds"]["passwordhash"]
        print hashvalue
        # query the database (not using one right now for simplicity)
        if hashvalue == json.load(open(config.KEY_FILE))["blogcreds"]["passwordhash"]:
            return True
        else:
            return False

    # standardized responses
    def _passed( self, username ):
        session["username"] = username 
        session.changed = True
        return { "logged_in" : True } 


    def _failed( self, message=None ):
        response = { "logged_in" : False }
        if message:
            response["message"] = message
        return response
