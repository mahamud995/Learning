create an account in dockerhub.

search for node image . in that click on how to use this image 

How to use this image
Create a Dockerfile in your Node.js app project

# specify the node base image with your desired version node:<version>
FROM node:17-alpine
# replace this with your application's default port
EXPOSE 4000

  Dockerfile


FROM node:10  (this is the docker version of node)
WORKDIR /app   (we are telling docker to create app directory for itself)
COPY  package.json   /app  (copy package.json inside app)
RUN npm install
COPY .    /app  (copy everything from current directory to app folder)
CMD node app.js  (run the command to run the app)
EXPOSE 3000





To start the application , we use the Docker compose 


version : '3.7'  

services:   (services are just the container we want to run in the docker-compose)
    node-docker-app :   (container name)
    build:                       (build step)
      context:  .                     (where in the directory you want to find the docker file , in this case its current directory so you can pass .)
      dockerfile: Dockerfile   (specify dockerfile in the current directory)
      target: base     
   volumes :             (volumes in docker , they create data that is persist in your container . You are actually using data from your local directory)
     -   <local_directory_path (./src)>: <docker_directory_path  /home/node/app/src>
    -   <local_directory_nodemon_path (./nodemon.json)>: <save nodemon path in docker directory  /home/node/app/nodemon.json>
 container_name: node-docker-app
 expose:   (we expose a port on which the application was running)
   -  '4000'
 ports:   (we also need to map , the expose the port docker is running to the port the application is running)
   -  '4000:4000'
 command:  npm run dev   (to start the application)


After the creating compose file you need to build your image  before running the application
docker-compose build 

Now we can run 

docker-compose  up -d   (this command gonna look for docker-compose.yml file , its gonna execute everthing in docker-compose.yml file)

![image](https://user-images.githubusercontent.com/64247526/148167258-a40ecd29-d7b4-4004-b222-372018520528.png)


how to build docker image

docker build -t <name of image>  .   (dot for current directory).

Image is created , now we need to run the docker app

docker run -it -p 4000:4000  <image-name>  (first 4000 is the port we listed in docker file, and second 4000 is what our application is using) 

  ![image](https://user-images.githubusercontent.com/64247526/148107058-8562d40e-00ce-477a-8f47-a8b0144d7d44.png)

  
  What is Docker?

Docker is a tool for running applications in an isolated environment.

Containers vs VM

Containers : Containers are the abstraction at the app layer that packages code and dependencies together. Multiple containers can run on the same machine and share OS kernel with other containers, each running as isolated processes in user space.

Virtual Machines : Virtual Machines are an abstraction of physical hardware turning one server into many servers. The Hypervisor allows multiple VMs to run on a single machine. Each VM includes a full copy of an operating system , the application, necessary binaries and libraries - taking up tens of GBs. VMs can also be slow to boot.![image]  
  
  
  commands
  
  docker run <imageName>

docker run nginx:latest    (docker container is running)

To list running containers
docker container ls 

Lets run the container in the detach mode
docker run -d nginx:latest

You can also check running container using below command
docker ps    

To stop container 

docker stop <containerID> 

  Exposing Multiple Ports

We can map multiple ports to port 80 of the container . Ex  localhost 8080 port 8080 on  host maps 80  and lcoalhost:3000 port 3000 on host maps 80

docker run -d -p 8080:80 -p 3000:80 nginx:latest

Managing Containers

 stop container 

docker stop <containerName or containerId>

We have just stopped the container , its available to run again.  To start the stopped container
docker start <containerName or containerId>
 
To see all running and stopped containers
docker ps -a

To delete the container 
docker rm  <containerId or containername> 

We cannot delete the running container . We need to stop the container first and then delete it.

docker ps -aq   (lists all container with only containerID's)![image](https://user-images.githubusercontent.com/64247526/148167376-0ca724ea-241e-4a46-9464-9a8232e7de24.png)

  docker rm $(docker ps -a -q)   (run the command in powershell) 

How to stop all containers
docker stop $(docker ps -a -q)  (run the command in powershell) 

While deleting or removing the container if any of the container is running then it will throw error so you can use -f force flag
docker rm -f $(docker -ps -a -q) (run the command in powershell) ![image](https://user-images.githubusercontent.com/64247526/148167416-4a69e1c3-14db-42c6-bfcf-0c44c5783412.png)

  Volumes

Docker volumes allows sharing of data . This could be files & folders  between Host and Containers  , between Containers.
