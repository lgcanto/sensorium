# Sensorium

## Initial Stack

- Backend on .NET core running on .NET container (https://hub.docker.com/_/microsoft-dotnet-core)
- Frontend on Angular 8 running on NGINX container (https://hub.docker.com/_/nginx)
- Access management with KeyCloak (https://www.keycloak.org/)
- PostgreSQL Database

## Prerequisites: 

- Docker Engine
- Docker Compose
- VS Code with Remote Explorer extension (Docker Extension can help as well)

## Running Locally
- Run the command below in repo root:
```console
docker-compose up --build
```
- Wait a bit, and test swagger requests by accessing https://0.0.0.0:5001/swagger/index.html
- Test UI by accessing http://0.0.0.0:4200/main/table
- `Ctrl+C` to stop all containers

## Development Guidelines

- Run the command below in repo root:
```console
docker-compose -f dev-docker-compose.yml up --build
```
- Wait a bit
- backend and frontend containers will be running but not their apps! Database container will be running as well.
- Since we're mounting volumes on the frontend and backend containers, any changes made on the code inside the container will reflect on the repo directory and vice versa.

### Backend Development

- Attach shell or VS Code to the backend container (seback-dev)
- Make the changes you wish!
- Run the following to start the application:
```console
root@6a4798d5b5aa:/Sensorium# dotnet run
```
- Test by accessing https://0.0.0.0:5001/swagger/index.html

### Frontend Development

- Attach shell or VS Code to the frontend container (sefront-dev)
- Run the following to download dependencies (you won't need to do this again as long as you keep the folder on `/frontend/Sensorium/node_modules`):
```console
/Sensorium # npm install
```
- Make the changes you wish!
- Run the following to start the application:
```console
/Sensorium # npm start
```
- Test by accessing http://0.0.0.0:4200/main/table

# If I had more time I would...
- Check if InfluxDB and Grafana can be a better solution
    - My biggest regret, it seems like a simple a solution, unfortunately I couldn't think about it in the beggining of the challenge.
    - Data from sensor could be sent directly to the DB using UDP protocol: less preprocessing and low overhead (https://www.influxdata.com/blog/how-to-send-sensor-data-to-influxdb-from-an-arduino-uno/)
- Fix table reload (only loading new data while changing pagination/entering filter text, but requests are happening)
- Add endpoint to retrieve number of events in the last hour
- Unit tests for backend
- Unit tests for frontend (there's only the angular default tests there)
- Finish CICD.md
- Create UML.md
- Incorporate KeyCloak
- Adjust current CICD script to Azure