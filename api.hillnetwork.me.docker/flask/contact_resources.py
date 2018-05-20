#!/usr/bin/env python
from flask import Flask
from flask import request
from flask_restful import Resource, Api
import requests
import json
import config
import resource_types

# accepts a number of parameters and returns { status : $status }
class ContactSubmit(resource_types.CaptchaProtected):


    def __init__(self ):
        self._SENDGRID_API_KEY = json.load( open(config.KEY_FILE))["sendgrid"] 
    def post(self):
        
        # user-given fields
        params = request.get_json()

        if not params:
            return { "status" : False,
                     "message" : "Not enough parameters supplied."
                     }
            
        # make sure we have our required args
        if not set(["email","message"]).issubset(set(params)):
            return { "status" : False,
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

        
        # now send the actual payload
        try:
            response = requests.post("https://api.sendgrid.com/v3/mail/send", 
                    headers=custom_headers,
                    json=payload) 

            status = str(response.status_code) == str(202)

        except requests.exceptions.ConnectionError:
            status = False

        return {"status": status }

