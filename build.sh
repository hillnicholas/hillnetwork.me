#!/bin/bash


function main() {
	# delete any old instance running
	if docker ps -f name=test | grep -v "CONTAINER ID"; then
		docker stop test
		docker rm test
	fi


	# define vars
#	REACT_DEV_ENV=nick@192.168.2.28

	# build the react website (hosted in separate environment)
#	ssh $REACT_DEV_ENV "npm run build --prefix=/home/nick/website"

	# copy the production files to current directory
#	scp -r $REACT_DEV_ENV:/home/nick/website/build/* shouldbehiring.me


	# build the documentation website 
	sh -c "cd docs.hillnetwork.me && mkdocs build"


	# build the container
	docker build . -t nicks-webstack



	# show the container running
	docker ps 
}


case $1 in
	--color | -c )
		main 2> >(sed $'s,.*,\e[31m&\e[m,'>&2)
		;;

	*)
		main
		;;
esac 
