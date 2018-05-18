FROM nginx
# website content

RUN mkdir -p /usr/share/shouldbehiring.me/html \
 	&& mkdir -p /etc/letsencrypt/live/hillnetwork.me/


# remove any existing configs
RUN rm /etc/nginx/conf.d/*

COPY nginx/nginx.conf /etc/nginx/nginx.conf

# site configs
COPY nginx/conf.d/shouldbehiring.me.conf /etc/nginx/conf.d/shouldbehiring.me.conf
COPY nginx/conf.d/docs.hillnetwork.me.conf /etc/nginx/conf.d/docs.hillnetwork.me.conf
COPY nginx/conf.d/https-redirect.conf /etc/nginx/conf.d/https-redirect.conf


COPY shouldbehiring.me/build /usr/share/shouldbehiring.me/html
COPY docs.hillnetwork.me/site /usr/share/docs.hillnetwork.me/html



