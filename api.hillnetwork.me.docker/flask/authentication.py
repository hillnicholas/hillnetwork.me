from flask import session
from flask import request
from flask_restful import Resource 
import resource_types
import re
import json
import hashlib

import config
import database


# This module will be responsible for starting sessions. 
# Avaliable under /auth/login
class Authenticator( resource_types.Public ):



    def __init__( self ):
        super( resource_types.Public, self ).__init__()
        self.hndb = database.HillnetworkDatabase()



    def post( self ):
        
        if request.content_type != "application/json":
            return self._failed( message="bad content-type")

        credentials = request.get_json()

        if not credentials:
            return self._failed( message="invalid/missing parameters")

        username = credentials.get("username", False )
        password = credentials.get("password", False )

        if set(credentials.keys()) != set(["username","password"]):
            return self._failed( message="invalid/missing parameters")

        valid = re.search( config.USERNAME_REGEX, username ) and \
                        re.search( config.PASSWORD_REGEX, password )

        if not valid:
            return self._failed( message="invalid username or password.")
       
        if self.hndb.verify_login( username, password ):
            return self._passed( username )
        else:
            return self._failed( message="invalid username or password.")



    # do get to test if logged in
    def get( self ):
        return { "logged_in" : bool( session.get("username", False) ) }




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
