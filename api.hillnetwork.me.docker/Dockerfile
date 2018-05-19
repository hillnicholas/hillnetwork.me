FROM alpine
# website content

RUN apk update \
	&& apk add py-flask \
	&& apk add py-requests \
	&& apk add uwsgi


#RUN mkdir -p /usr/share/api.hillnetwork.me  \
#	&& rm /etc/nginx/conf.d/*

#COPY nginx/conf.d/api.hillnetwork.me.conf /etc/nginx/conf.d/api.hillnetwork.me.conf

COPY uwsgi/api.hillnetwork.me.json /etc/uwsgi/conf.d/
COPY flask/app.py /usr/share/api.hillnetwork.me


CMD ["uwsgi", "--json", "/etc/uwsgi/conf.d/api.hillnetwork.me.json"]
