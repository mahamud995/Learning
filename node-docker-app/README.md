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
  
  
  	INTRODUCTION TO KUBERNETES
	
	
	Kubernetes is a container orchestration tool. Originally developed by google.  It manages container (ex docker containers)
	Helps you manage containerized applications (suppose your application is made of 100 or 1000 of containers)  in different environment.
	
	
	The need for a container orchestration tool 
	
	1. Trend from monolith to Microservices
	2. Increased usage of containers
	3. Demand for a proper way of managing hundreds of containers.

What features  do orchestration tool provides?
 1. High Availability (No Downtime)
 2. High Performance (High Scalibility)
 3. Disaater recovery
	  
	
	
	Kubernetes Architecture
	
	Kubernetes basic architecture  looks like
	
	Kubernetes cluster is made up of atleast one master node and connected to it you have a couple of worker nodes. Where each node has kubelet process running on it.
	Kubelet is kubernetes process that makes it possible for cluster to talk to each other and to communicate each other and executes some tasks on those nodes.
	Each worker node has docker containers of different applications deployed on it. 
	Depending on how work load is distributed you have different no of docker containers running on Worker nodes. Worker nodes are there actual work is happening .  
	On Worker nodes your application are running.
	
	Master node actually runs several kubernetes processes that are absolutely necessary to run and manage cluster properly.
	One of such processes are
	  1. API Server (which is also a container) => It is a entry point to the kubernetes cluster . This is the process to which different K8s client will talk to.
	
	
	  2. Controller Manager => Keeps tracks of whats happening in the cluster  (if container dieds and it need to be restarted ..etc)
	 3.  Scheduler  => Basically responsible for scheduling containers on different nodes based on work load and availability (Ensures pods placement)
	 4. etcd (key value storage) =>  which basically holds at any time current state of k8s cluster . It holds all the configuration data and all the status data of each nodes and container (k8s backing key value store)
	
	
    Virtual Network =>  which enables worker nodes and master node talk to each other . Virtual network turns all the nodes inside the cluster into one powerful machine that has sum of all resources of individual nodes.


	
	Worker nodes actually process more work load compared to master.
	Master node is much more important than worker node . If you lose access to master node than you can't access cluster anymore. You always need to have backup of your master node.
	
	
	KUBERNETES COMPONENTS
	
	Node :  which is basically a simple server (ex:  VM)
	
	
	Pod : a smallest unit of k8s.  It is basically an abstraction over container. ( you only interact with k8s layer).  Usually one application per Pod.
	Now let's check how pods communicate with each other . Each pods gets its own ip address. Pods can die easily and a new one gets created then a new IP-address is assigned. Because of it ,it will effect the pod communication. Because of that a another component is used (Service)
	
	
	Service and Ingress
	Service is basically a static IP address or permanent IP address.so that can be attached to each Pod. So each pod will have its own service.
	The lifecycle of Pod and Service are not connected . So even pod dies , the service and its IP address will stay.
	
	
	Now we want our application to be accessed via browser
	For this we need to create an external service . It is service which opens communication  from external sources 
	
	Ingress : The external request for goes through the Ingress.
	
	
	
	
	Pods communicate with each other using service.
	
	
	configMap :  External configuration of the application (ex: DB connectionstring , other Urls..etc) . We cant keep DB credentials in configMap.
	
	
	
	Secret : Just like configMap but used to store secret data. Ex( DB password and username). Its stored in base64 encoded format. The built in security mechanism is not enabled by default.
	We can access the configMap or secret values in application by using environment variables or as property file.

