#!/bin/bash


docker run --name nicks-webstack-test -p 8080:80 -p 8443:443 -dt -v /etc/letsencrypt/live/hillnetwork.me/fullchain.pem:/etc/letsencrypt/live/hillnetwork.me/fullchain.pem -v /etc/letsencrypt/live/hillnetwork.me/privkey.pem:/etc/letsencrypt/live/hillnetwork.me/privkey.pem nicks-webstack
