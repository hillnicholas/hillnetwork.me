#!/bin/bash

URL=https://hillnetwork.me



function red {
	printf "\e[31m$1\e[0m"
}

function green {
	printf "\e[32m$1\e[0m"
}

function test_url {
	WEBPATH=$1
	STATUS=`curl --insecure -I $URL$WEBPATH 2>/dev/null | sed -ne "s/HTTP\/1.1 \([\0-9]\+\).*/\1/p"`
	
	if [ "$STATUS" = "200" ]; then
		green "[$STATUS PASSED]\t"
		printf "host=$URL\t"
		printf "path=$WEBPATH "
	else 
		red "[$STATUS FAILED]\t"
		printf "host=$URL\t"
		printf "path=$WEBPATH"
	fi
	echo
}

WEBPATHS=("/" "/cgi-bin" )
for p in ${WEBPATHS[@]}; do 

	# echo "===| Testing index |==="
	# curl $URL$p 2>&/dev/null 
	test_url "$p"

	# printf "\n\n\n"
done
