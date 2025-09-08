# Rental Inventory System

This is a simple web application that can be used to view and update items available in the inventory of a rental warehouse. 

It consists of three main components across separate containers: 
* An Angular based web application
* A Node.js / Express.js based REST API 
* A MySQL based database

The web application provides a user interface through which users can view and add products in the inventory. This interacts with the REST API through HTTP GET and POST requests. 

The REST API allows for a decoupling of interaction between the user interface and the database. By accessing certain endpoints, the UI can retrieve and update inventory, as the API is connected to the database and running SQL queries under the hood.

The MySQL database allows the inventory data to be stored, and is initalised with sample data.  

## Quickstart

To start, you must first have [Docker](https://www.docker.com/) and [git](https://git-scm.com/downloads) installed on your PC.

Then you may clone the repository using the following command

```
git clone https://github.com/arcfernandes04/cosc349-assignment-1.git
```

Start the application by running the following command within the `cosc349-assignment-1` directory.

```
docker compose up --build
```

This may take some time to complete.

Once finished, you can then access the user interface at [http://localhost:4000](http://localhost:4000)

## Development
Making changes within the system is easy; simply navigate to the directory containing the project component that you wish to alter and run the following commands to rebuild and restart the container.

```
docker compose down frontend
docker compose build frontend
docker compose up frontend
```
Replace "frontend" with "database" or "rest-api" as appropriate.