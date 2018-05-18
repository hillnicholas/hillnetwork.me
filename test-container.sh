#!/bin/bash

function interactive() {
docker run --name nicks-webstack-test -p 8080:80 -p 8443:443 -it -v /etc/letsencrypt/live/hillnetwork.me/fullchain.pem:/etc/letsencrypt/live/hillnetwork.me/fullchain.pem -v /etc/letsencrypt/live/hillnetwork.me/privkey.pem:/etc/letsencrypt/live/hillnetwork.me/privkey.pem nicks-webstack sh
}


function background() {
	docker run --name nicks-webstack-test -p 8080:80 -p 8443:443 -dt -v /etc/letsencrypt/live/hillnetwork.me/fullchain.pem:/etc/letsencrypt/live/hillnetwork.me/fullchain.pem -v /etc/letsencrypt/live/hillnetwork.me/privkey.pem:/etc/letsencrypt/live/hillnetwork.me/privkey.pem nicks-webstack 
}


case $1 in

	-d)
		background
		;;
	*)
		interactive
		;;
esac
