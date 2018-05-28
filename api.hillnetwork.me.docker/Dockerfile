FROM alpine
# website content

RUN apk update \
	&& apk add py2-pip \
	&& apk add uwsgi \
	&& apk add uwsgi-python \
	&& pip install flask \
	&& pip install flask_restful \
	&& pip install requests \
	&& pip install mysql-connector \
	&& mkdir -p /usr/share/api.hillnetwork.me

COPY uwsgi/api.hillnetwork.me.json /etc/uwsgi/conf.d/
COPY flask /usr/share/api.hillnetwork.me
COPY flask/keys.json /keys.json


EXPOSE 8080

CMD ["uwsgi", "--json", "/etc/uwsgi/conf.d/api.hillnetwork.me.json"]
