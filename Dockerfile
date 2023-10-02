FROM ubuntu:20.04
LABEL maintainer="Sumo Logic <docker@sumologic.com>"

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update --quiet && \
 apt-get install -y --no-install-recommends apt-utils && \
 apt-get upgrade --quiet --allow-downgrades --allow-remove-essential --allow-change-held-packages -y && \
 apt-get install --quiet --allow-downgrades --allow-remove-essential --allow-change-held-packages -y wget && \
 wget -q -O /tmp/collector.deb https://collectors.sumologic.com/rest/download/deb/64 && \
 dpkg -i /tmp/collector.deb && \
 rm /tmp/collector.deb && \
 apt-get clean --quiet && \
 rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY sumo-sources.json /etc/sumo-sources.json

COPY run.sh /run.sh
ENTRYPOINT ["/bin/bash", "/run.sh"]

FROM node:16-alpine AS builder
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm run setup
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=builder ./app/dist/webapp ./usr/share/nginx/html/
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
CMD [ "node", "server.js" ]