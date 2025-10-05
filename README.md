# Rental Inventory System

This is a simple web application that can be used to view and update items available in the inventory of a rental warehouse. 

It consists of three main components across separate containers: 
* An Angular based web application hosted in an EC2 instance
* A Node.js / Express.js based REST API hosted in an EC2 instance
* A MySQL based database hosted as an RDS database. 

The web application provides a user interface through which users can view and add products in the inventory. This interacts with the REST API through HTTP GET and POST requests. 

The REST API allows for a decoupling of interaction between the user interface and the database. By accessing certain endpoints, the UI can retrieve and update inventory, as the API is connected to the database and running SQL queries under the hood.

The MySQL database allows the inventory data to be stored, and is initalised with sample data.  

## Getting it all up and running

To start, you must first have [git](https://git-scm.com/downloads) installed on your PC, and have valid AWS credentials.

Then you may clone the repository using the following command

```
git clone https://github.com/arcfernandes04/cosc349-assignment-1.git
```

<table>
  <tr>
    <th>Component</th>
    <th>Set up</th>
  </tr>
  <tr>
  <td>Database </td>

  <td>
      Navigate to the RDS service in your AWS console and select `Create Database`. 
      <br><br> 
      Select **MySQL** as the engine type and **Dev/Test** as the sample template. 
      <br><br> 
      Name your DB cluster appropriately, and create a set of credentials (make sure to take note of any auto generated credentials). 
      <br><br> 
      Under `Additional Configuration` make sure to give your database a name so that a database is created. 
      <br><br> 
      You may leave most other default configuration settings as is, or adjusted to suit any modifications you have made to the application. 
      <br><br> 
  </td>
</tr>
</table>
| Component | Set up | 
| :--- | :--- | 
| Database | Navigate to the RDS service in your AWS console and select `Create Database`. <br><br> Select **MySQL** as the engine type and **Dev/Test** as the sample template. <br><br> Name your DB cluster appropriately, and create a set of credentials (make sure to take note of any auto generated credentials). <br><br> Under `Additional Configuration` make sure to give your database a name so that a database is created. <br><br> You may leave most other default configuration settings as is, or adjusted to suit any modifications you have made to the application. <br><br> | 
| REST API | Navigate to the Ec2 service in your AWS console and select `Launch Instance`. 

Name your instance appropriately and select **Amazon Linux** as the AMI. 

For instance type I select t2.micro as this is a cheap and suitable option for the REST API and front end, however consider these options as you extend the application. 

If you do not already have a key pair login configured or wish to configure one unique to this instance, do so here and make sure to download the `.pem` private key somewhere appropriate so that you can access this later. 

Under network settings, the default SSH traffic configuration should allow SSH traffic from anywhere, if this is not the case please change these settings to match.

You may leave most other default configuration settings as is, or adjusted to suit any modifications you have made to the application. Launch your instance. (Beyond here, steps differ for Frontend component).

Once running, select your instance and hit the "Connect" button and follow the SSH client connection instructions to SSH into your instance.

In a separate terminal window, run the following command to copy the application files over to the remote instance.

```
> scp -i [private key path] -r [repository path]/rest-api/src/* ec2-user@[EC2 instance public DNS address]:~/dist/
```
*Note the use of square brackets to denote where you need to fill in information.*

Back in the SSH connection terminal window, install the dependencies required for the REST API, run the following commands:

```
> sudo yum install -y nodejs
> sudo dnf install mariadb105 
> npm install
```

Run the following command to insert the sample data into the database:

``` 
> mysql -h [Database public endpoint] -P [Database port] -u [Database username] -p < database-init.sql
```
*The database endpoint and port can be found within the database Connectivity & security information.* | 
| Charlie | 22 | 



### Conecting it all up


### Frontend

You must also allow HTTP and HTTPS traffic from the internet.

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

Same set-up steps up to SSH into the instance BUT don't allow HTTP/HTTPS traffic
Should be under same VPC as DB

1. sudo yum install -y nodejs
2. sudo dnf install mariadb105
3. mysql -h [dns of db] -P [db port] -u [user name] -P
4. create the db and tables + insert
5. scp to copy the application files over to instance
6. npm i
7. update env to target the RDS DB
8. update frontend to target api
9. need to give permission for access (security group >add rule or something> TCP on port 3000 + any IPv4)

### DB
* 
  * Make sure to "connext to an EC2 instance" - this will be your server - allows for the communiation


## Development
Making changes within the system is easy; simply navigate to the directory containing the project component that you wish to alter and run the following commands to rebuild and restart the container.

```
docker compose down frontend
docker compose build frontend
docker compose up frontend
```
Replace "frontend" with "database" or "rest-api" as appropriate.
