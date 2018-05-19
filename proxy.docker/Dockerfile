FROM nginx:alpine

RUN rm /etc/nginx/conf.d/* && \
	mkdir -p /etc/letsencrypt/live/hillnetwork.me

COPY nginx/conf.d/proxy.conf /etc/nginx/conf.d/proxy.conf

