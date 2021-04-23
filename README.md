# Projects
This folder consists of four projects;

1. `metric-generator` : 
    - Reads measurement set.
    - Process and generate quality metrics.
    - Feed the quality metrics to message broker using broker-api.  
2. `broker-api` : REST-API server to disseminate real-time data streams (e.g., QA Signal Display) through message broker (Kafka).
3. `signal-display-api` : QA signal display consumer RESTful API server.
    - Subscribes to the message broker.
    - Accepts connection request from clients (e.g., signal display user interface) on a socket.
    - Receives messages, whenever available, from the message broker.
    - Writes the received message to a socket.

4. `signal-display-ui` : QA signal display user interface
    - Connects to the `signal-display-api` on a socket.
    - Visualizes the received messages (e.g, using a spectrum plot).

> Note that in future, the above mentioned four projects may be spitted into four different repositories.


# Services Start Sequence

1. Message Broker (next section)
2. `broker-api`
3. `signal-display-api`
4. `signal-display-ui`
5. `metric-generator`

For 2-5 see README.md inside each folder. TODO: dockerize.

# Message Broker Setup / Run


Start the message broker and dependent services;

```bash
docker-compose up -d
docker-compose ps
```
> Note that if any process has not started or exited then run the command `docker-compose up -d` again.


Access the broker control center UI: http://localhost:9021


