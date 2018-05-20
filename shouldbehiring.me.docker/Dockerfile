FROM nginx:alpine

RUN mkdir -p /usr/share/shouldbehiring.me/html \
 	&& rm /etc/nginx/conf.d/*

COPY nginx/conf.d/shouldbehiring.me.conf /etc/nginx/conf.d/shouldbehiring.me.conf
COPY shouldbehiring.me/build /usr/share/shouldbehiring.me/html

RUN rm -r /usr/share/shouldbehiring.me/html/content/*

