# Only for CICD use

FROM nginx:1.19.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY /Sensorium/dist/Sensorium /usr/share/nginx/html

EXPOSE 80