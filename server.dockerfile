FROM node:16-alpine AS builder
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm run setup
RUN npm run build
RUN apt-get update --quiet && \
 apt-get install -y --no-install-recommends apt-utils && \
 apt-get upgrade --quiet --allow-downgrades --allow-remove-essential --allow-change-held-packages -y && \
 apt-get install --quiet --allow-downgrades --allow-remove-essential --allow-change-held-packages -y wget && \
 wget -q -O /tmp/collector.deb https://collectors.sumologic.com/rest/download/deb/64 && \
 dpkg -i /tmp/collector.deb && \
 rm /tmp/collector.deb && \
 apt-get clean --quiet && \
 rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=builder ./app/dist/webapp ./usr/share/nginx/html/
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY sumo-sources.json /etc/sumo-sources.json

COPY deploy.sh /deploy.sh
ENTRYPOINT ["/bin/bash", "/deploy.sh"]

# Expose port 80
EXPOSE 80
