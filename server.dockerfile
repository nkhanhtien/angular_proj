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
