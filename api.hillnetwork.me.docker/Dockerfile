FROM alpine
# website content

RUN apk update \
	&& apk add py-flask \
	&& apk add py-requests \
	&& apk add uwsgi \
	&& apk add uwsgi-python


COPY uwsgi/api.hillnetwork.me.json /etc/uwsgi/conf.d/
COPY flask/app.py /usr/share/api.hillnetwork.me/app.py

EXPOSE 8080

CMD ["uwsgi", "--json", "/etc/uwsgi/conf.d/api.hillnetwork.me.json"]
