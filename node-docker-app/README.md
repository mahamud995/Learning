create an account in dockerhub.

search for node image . in that click on how to use this image 

How to use this image
Create a Dockerfile in your Node.js app project

# specify the node base image with your desired version node:<version>
FROM node:17-alpine
# replace this with your application's default port
EXPOSE 4000


how to build docker image

docker build -t <name of image>  .   (dot for current directory).

Image is created , now we need to run the docker app

docker run -it -p 4000:4000  <image-name>  (first 4000 is the port we listed in docker file, and second 4000 is what our application is using) 

  ![image](https://user-images.githubusercontent.com/64247526/148107058-8562d40e-00ce-477a-8f47-a8b0144d7d44.png)
