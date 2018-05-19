#!/usr/bin/env python
from flask import Flask
from flask import request
from flask_restful import Resource, Api
import requests
import json




# Create a wrapper for more semantic meaning
Public = Resource


SENDGRID_API_KEY = json.load( open('keys.json'))["sendgrid"] 

# API testing 
class Test(Public):
    def get(self):
	return {"test" : "get" }
    def post(self):
	return {"test" : "post" }



# send a 
class ContactSubmit(Public):

    def post(self):

        # user-given fields
        user_name = request.form.get("name","")
        user_message = request.form["message"]
        user_email =  request.form["email"]

       
        # Our fields
        send_to = "nick@hillnetwork.me"
        send_from = "nick@hillnetwork.me"
        subject = "[hillnetwork.me] New contact form from \"" + user_name + "\" <" +user_email + ">"
        message = user_message
      
        
        custom_headers = {
                "Authorization" : "Bearer " + SENDGRID_API_KEY,
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

        return {"status": status,
                "debug" : response.status_code }




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

