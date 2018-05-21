#!/usr/bin/env python
from flask import Flask
from flask import session
from flask import request
from flask_restful import Resource, Api
import config
import requests
import json


# Create a wrapper for more semantic meaning
Public = Resource 


# subclass of resource. 
class CaptchaProtected( Resource ):

    def __init__( self ): 
        super( Resource, self ).__init__()
        self._API_SECRET = json.load( open(config.KEY_FILE))["reCAPTCHA"]["secretKey"] 
        self._VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"


    def post( self ):
        
        if request.content_type == "application/json":
            captcha = request.get_json().get("g-recaptcha-response", None )
        else:
            captcha = request.form.get("g-recaptcha-response", None )

        # if no captcha, don't continue.
        if not captcha:
            return self.invalid_captcha()

        response = requests.post(   self._VERIFY_URL, 
                                    params = { "secret" : self._API_SECRET,
                                            "response" : captcha 
                                            }
                                    )
        # if not ok, return bad captcha
        if not response.json()["success"]:
            return self.invalid_captcha() 

        # otherwise, its ok
        return self.post_verified()    

    def invalid_captcha( self ):
        return {
                 "status" : False,
                 "message" : "Invalid captcha.",
                }



class Authenticated( Resource ):

    def post( self ):
        if "username" in session:
            if "post_authenticated" in dir(self):
                return self.post_authenticated()
            else:
                return None, 405 
        else:
            return self._not_authenticated()


    def get( self ):
        if "username" in session:
            if "get_authenticated" in dir(self):
                return self.get_authenticated()
            else:
                return None, 405 
        else:
            return self._not_authenticated()


    
    def _not_authenticated( self ):
        return { 
                "status" : False,
                "message": "Not authenticated"
                }


