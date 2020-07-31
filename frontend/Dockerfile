FROM node:current-alpine3.12
WORKDIR /Sensorium

COPY ./Sensorium /Sensorium

EXPOSE 4200

RUN npm install

ENTRYPOINT npm start