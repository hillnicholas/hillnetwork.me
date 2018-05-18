FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*
COPY nginx/conf.d/proxy.conf /etc/nginx/conf.d/proxy.conf

# certs
COPY test-ssl /etc/letsencrypt/live/hillnetwork.me/

