#!/bin/bash


docker run --name nicks-webstack-prod \
	-p 80:80 \
	-p 443:443 \
	-dt \
	-v /etc/letsencrypt/live/hillnetwork.me/privkey.pem:/etc/letsencrypt/live/hillnetwork.me/privkey.pem \
		nicks-webstack
