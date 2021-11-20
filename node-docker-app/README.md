create an account in dockerhub.

search for node image . in that click on how to use this image 

How to use this image
Create a Dockerfile in your Node.js app project

# specify the node base image with your desired version node:<version>
FROM node:10
# replace this with your application's default port
EXPOSE 8888


how to build docker image

docker build -t <name of image>  .   (dot for current directory).

Image is created , now we need to run the docker app

docker run -it -p 3000:3000  <image-name>  (first 3000 is the port we listed in docker file, and second 3000 is what our application is using) 
