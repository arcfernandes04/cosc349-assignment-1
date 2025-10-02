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

To start, you must first have [git](https://git-scm.com/downloads) installed on your PC, and have AWS credentials.

Then you may clone the repository using the following command

```
git clone https://github.com/arcfernandes04/cosc349-assignment-1.git
```

### Frontend

To start up an EC2 instance to run the frontend on, first navigate to EC2 on your AWS Console. 

You may then launch a new instance using the "Launch Instance" button. 

Name your instance something appropriate, and select **Amazon Linux** as the AMI. It should be fine to leave the other AMI related settings at their defaults

For instance type, I chose to run t2.micro, as this is a cheap and suitable option for the frontend, however depending on how you choose to extend the application, please keep in mind your instance requirements. 

If you do not already have a key pair login configured or wish to configure one unique to this instance, do so here and make sure to download the `.pem` private key somewhere appropriate so that you can access this later. 

Under network settings, the default SSH traffic configuration should allow SSH traffic from anywhere, if this is not the case please change these settings to match. You must also allow HTTP and HTTPS traffic from the internet.

The remaining default configurations are suitable for the frontend. Launch your instance.

Once running, select your instance and hit the "Connect" button and follow the SSH client connection instructions to SSH into your instance. 

further steps (WIP):
1. build the frontend using ng build
2. copy dist files somewhere sensible
3. scp -i [private key path] -r [location of dist files]/* [the ec2-user@... addr]:~/dist/ to copy dist over to the ec2 instance
   1. Vs `rsync`?
4. in the ssh client:
   1. sudo chmod 777 dist
   2. sudo yum install nginx -y
   3. sudo systemctl enable nginx
   4. sudo systemctl restart nginx
   5. changes to nginx conf:
        * vim /etc/nginx/nginx.conf
        * server {...}
          * server_name [the ec2 DNS addr];
          * root /home/eec2-user/dist;
          * index index.html;
          * location / {
            * tru_files $uri /index.html;
          * }
    6. sudo chown -R nginx:nginx /home/ec2-user/dist
    7. sudo chmod -R 755 /home/ec2-user/dist
    8. sudo chmod 755 /home/ec2-user /home/ect-user/dist
    9. sudo cmod 644 /home/ec2-user/dist.index.html
    10. sudo nginx -t
    11. sudo sytemctl reload nginx
    12. sudo sytemctl restart nginx
5. open the instance's public IPv4 addr to see the frontend


### REST API
[tutorial](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-rest-new-console.html)

[EC2 Hosted Node.js Server](https://www.youtube.com/watch?v=23FdTTuFDC0)

### DB
* RDS create DB
  * MySQL
  * Dev/Test
  * name appropriately
  * gen password - make sure to note it down!!
  * no public access (we only want E2 instances to connect)
* Can see endpoint info within the db info
  * if yes for public access can literally just do connections as per
* need an E2 instance that exists to have the connection ability?
  * E2 hosts the DBMS and RDS Hosts the DB?


## Development
Making changes within the system is easy; simply navigate to the directory containing the project component that you wish to alter and run the following commands to rebuild and restart the container.

```
docker compose down frontend
docker compose build frontend
docker compose up frontend
```
Replace "frontend" with "database" or "rest-api" as appropriate.