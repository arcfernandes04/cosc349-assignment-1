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

To start, you must first have [git](https://git-scm.com/downloads) installed on your PC, and have access to the AWS console with valid credentials.

Then you may clone the repository using the following command

```
git clone https://github.com/arcfernandes04/cosc349-assignment-1.git
```

<br>

### Setting up the individual components

<table>
<tr>
  <th>Component</th>
    <th>Set up</th>
  </tr>
  <tr>
  <td>Database </td>

  <td>
    Navigate to the RDS service in your AWS console and select <code>Create Database</code> 
    <br><br> 
    Select <strong>MySQL</strong> as the engine type and <strong>Sandbox</strong> as the sample template. 
    <br><br>
    Name your DB cluster appropriately, and create a set of credentials (make sure to take note of any auto generated credentials). 
    <br><br> 
    Under <code>Additional Configuration</code> make sure to give your database a name so that a database is created. 
    <br><br> 
    You may leave most other default configuration settings as is, or adjusted to suit any modifications you have made to the application. 
    <br><br> 
  </td>
</tr>
<tr>
  <td>REST API</td>
  <td>
    Navigate to the Ec2 service in your AWS console and select <code>Launch Instance</code>. 
    <br><br>
    Name your instance appropriately and select <strong>Amazon Linux</strong> as the AMI. 
    <br><br>
    For instance type I select t2.micro as this is a cheap and suitable option for the REST API and front end, however consider these options as you extend the application. 
    <br><br>
    If you do not already have a key pair login configured or wish to configure one unique to this instance, do so here and make sure to download the <code>.pem</code> private key somewhere appropriate so that you can access this later. 
    <br><br>
    Under network settings, the default SSH traffic configuration should allow SSH traffic from anywhere, if this is not the case please change these settings to match.
    <br><br>
    You may leave most other default configuration settings as is, or adjusted to suit any modifications you have made to the application. 
    <br><br>
    <strong><i>Launch your instance. (Beyond here, steps differ for Frontend component).</strong></i>
</td></tr>
<tr><td>Connecting REST API to Database</td> 
<td>Back in the AWS console, view your database and select <strong>Connect to an EC2 instance</strong> and choose your REST API EC2 instance.
<br><br> Update <code>.env</code> and line #1 in <code>database-init.sql</code> to reflect the true database details. <br><br></td>
</tr>
<tr><td></td><td>
    Once running, select your instance and hit the <code>Connect</code> button and follow the SSH client connection instructions to SSH into your instance.
    <br><br>
    In a separate terminal window, run the following command to copy the application files over to the remote instance:
    <br><br>
    <pre><code>> scp -i [private key path] -r [repository path]/rest-api/* ec2-user@[EC2 instance public DNS address]:~/</code></pre>
    <i>Note the use of square brackets to denote where you need to fill in information.</i>
    <br><br>
    Back in the SSH connection terminal window, install the dependencies required for the REST API, run the following commands:
    <br><br>
    <pre><code>> sudo yum install -y nodejs</code><br><code>> sudo dnf install mariadb105</code><br><code>> npm install</code><br><code>> npm install -g pm2</code></pre>
    <br>
    Run the following command to insert the sample data into the database:
    <br><br>
    <pre><code>> mysql -h [Database public endpoint] -P [Database port] -u [Database username] -p < src/database-init.sql
</code></pre>
    <i>The database endpoint and port can be found within the database Connectivity & security information.</i>
    <br><br>
    Now, you can exit the mysql connection and run the following command to get the REST API up and running:
    <br><br>
    <pre><code>> pm2 start src/app.js</code></pre>
    <br>
  </td>
</tr>
<tr>
  <td>Frontend</td>
  <td>
    Firstly, you must build the frontend project using
    <br><br>
    <pre><code>> ng build</code></pre>
    <br>
    Next, follow the above steps for setting up an EC2 instance for the Frontend application similarly to the REST API - One additional step to note is that under network settings, You must also allow HTTP and HTTPS traffic from the internet.
    <br><br>
</td></tr>
<tr><td>Connecting Frontend to REST API</td> 
<td>Back in the AWS console, view your REST API EC2 instance and add a rule allowing <strong>TCP on port 3000 from any IPv4 address</strong> under <strong>security groups</strong>.<br><br>
Next, update <code>environment.ts</code> to reflect the actual REST API URI.</td>
</tr>
<tr><td></td><td>
    Once running, select your instance and hit the <code>Connect</code> button and follow the SSH client connection instructions to SSH into your instance.
    <br><br>
    In a separate terminal window, run the following command to copy the application files over to the remote instance:
    <br><br>
    <pre><code>> scp -i [private key path] -r [repository path]/frontend/rms/dist/rms/browser/* ec2-user@[EC2 instance public DNS address]:~/dist/</code></pre>
    <br>
      Back in the SSH connection terminal window, install the dependencies required for the REST API, run the following command:
      <pre><code>> sudo yum install nginx -y</code><br><code>> sudo systemctl enable nginx</code><br><code>> sudo systemctl restart nginx</code></pre>
      <br>
      Make the following changes to the <code>/etc/nginx/nginx.conf</code> configuration file within the <code>server</code> object:
      <br><br>
      <ul>
        <li>server_name [EC2 instance DNS address];</li>
        <li>root /usr/share/nginx/html/frontend;</li>
        <li>index index.html;</li>
        <li>location / { <br>
            try_files $uri /index.html; <br>
        }
      </ul>
      <br>
      To apply the required permission changes run the following commands: 
      <pre><code>> sudo mkdir -p /usr/share/nginx/html/frontend</code><br><code>> sudo chown -R nginx:nginx /usr/share/nginx/html/frontend</code><br><code>> sudo cp /home/ec2-user/dist/* /usr/share/nginx/html/frontend</code><br><code>> sudo nginx -t</code><br><code>> sudo systemctl reload nginx</code><br><code>> sudo systemctl restart nginx</code></pre>
  </td>
</tr>
</table>


To access the frontend, visit the IP address or DNS address of the frontend EC2 instance.


## Development
Redeploying after making changes within the system is easy; as your EC2 instances will already be configured, you simply need to copy any changes over to the instances.

For the REST API, once changes have been made, you can remove the old files and copy the updated ones to the EC2 instance using the `scp` command. Note that you will also need to stop and restart the application (`npm run start`).

For the frontend application, this requires you to rebuild the application using `ng build` and to remove the old build files from the instance. To copy over the updated files, you will first need to `chmod 777` the **dist** folder to allow this action. 

Next, you can copy over the updated files using the `scp` commands above, and then follow the permission modification steps. You may need to reload and restart `nginx` as well.