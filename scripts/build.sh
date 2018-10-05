#!/bin/bash


function main() {

	docker build docs.hillnetwork.me.docker -t docssite-image
	docker build shouldbehiring.me.docker -t mainsite-image
	#docker build api.hillnetwork.me.docker -t apiserver-image
	docker build proxy.docker -t proxy-image;
}

# add color to stderr
main 2> >(sed $'s,.*,\e[31m&\e[m,'>&2)
