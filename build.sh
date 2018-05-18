#!/bin/bash


function main() {

	docker build docs.hillnetwork.me.docker -t hillnetwork
	docker build shouldbehiring.me.docker -t shouldbehiring
	docker build proxy.docker -t proxy;
}


case $1 in
	--color | -c )
		main 2> >(sed $'s,.*,\e[31m&\e[m,'>&2)
		;;

	*)
		main
		;;
esac 
