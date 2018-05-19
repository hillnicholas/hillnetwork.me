#!/usr/bin/env python
from flask import Flask
from flask import request
from flask_restful import Resource, Api
import requests
import json




# Create a wrapper for more semantic meaning
Public = Resource 


# subclass of resource. 
class CaptchaProtected( Resource ):

    def __init__( self ): 
        super( Resource, self ).__init__()
        self._API_SECRET = json.load( open("/keys.json"))["reCAPTCHA"]["secretKey"] 
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



# API testing 
class Test( CaptchaProtected ):
    def post_verified(self):
	return {"test" : "post" }



# accepts a number of parameters and returns { status : $status }
class ContactSubmit(CaptchaProtected):


    def __init__(self ):
        self._SENDGRID_API_KEY = json.load( open('/keys.json'))["sendgrid"] 
    def post(self):
        
        # user-given fields
        params = request.get_json()

        if not params:
            return { "status" : "false",
                     "message" : "Not enough parameters supplied."
                     }
            
        # make sure we have our required args
        if not set(["email","message"]).issubset(set(params)):
            return { "status" : "false",
                     "message" : "Not enough parameters supplied."
                     }

        user_name = params.get("name","")
        user_message = params["message"]
        user_email =  params["email"]


        # Our fields
        send_to = "nick@hillnetwork.me"
        send_from = "nick@hillnetwork.me"
        subject = "[hillnetwork.me] New contact form from \"" + user_name + "\" <" +user_email + ">"
        message = user_message
      
        
        custom_headers = {
                "Authorization" : "Bearer " + self._SENDGRID_API_KEY,
                "Content-Type" : "application/json"
                }


        # taken directly from the sendgrid documentation
        payload = {
              "personalizations": [
                {
                  "to": [
                    {
                      "email": send_to,
                      "reply_to" : user_email
                      }
                  ],
                  "subject": subject
                }
              ],
              "from": {
                "email": send_from
              },
              "content": [
                {
                  "type": "text/plain",
                  "value": message 
                }
              ]
            }
    
        # debug 
        '''
        return { "type" : "debug",
                "name" : user_name,
                "email" : user_email,
                "message" : user_message,
            }
        '''

        # now send the actual payload
        try:
            response = requests.post("https://api.sendgrid.com/v3/mail/send", 
                    headers=custom_headers,
                    json=payload) 

            status = str(response.status_code) == str(202)

        except requests.exceptions.ConnectionError:
            status = False

        return {"status": status }




application = Flask(__name__)

@application.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response 



api = Api( application )




# no authentication needed for these 
api.add_resource( Test, '/test')
api.add_resource( ContactSubmit , '/contact/submit')




if __name__ == '__main__':
    application.run(debug=True)

