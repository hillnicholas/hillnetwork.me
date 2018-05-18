FROM nginx:alpine
# website content

RUN mkdir -p /usr/share/docs.hillnetwork.me/html \
	&& rm /etc/nginx/conf.d/*

COPY nginx/conf.d/docs.hillnetwork.me.conf /etc/nginx/conf.d/docs.hillnetwork.me.conf
COPY docs.hillnetwork.me/site /usr/share/docs.hillnetwork.me/html

