# PixelGram - Spring 2021 ADS Project
Authors:
1. [Suraj Gupta Gudla](https://github.com/surajgupta-git)
2. [Sravya Garaga](https://github.com/sravya160597)
3. [Sai Prudvi krishna Sannidhi](https://github.com/sannidhi09)

![Goals and Actions](https://user-images.githubusercontent.com/29830913/106647414-e5b25b80-655c-11eb-8c96-d008511033bf.jpg)
# Napkin Diagram
![Napkin diagram](https://user-images.githubusercontent.com/66148226/106688289-d0105680-659b-11eb-9f1e-f5432a3ad4e2.jpg)
# Overview:
Having access to a camera 24/7 has its benefits. Everything can be captured. The downside is, how can we store all these images and share them? Our photo sharing application "PixelGram" makes it the best way to store photos online when you use multiple devices to photograph. PixelGram allows bulk upload of images as well as supports automatic photo backup from various devices. The users can log in through their Google, IU, or GitHub credentials. This app allows the users to organize their photos into albums/folders and also tag their images with names and locations for searchability ease. The images stored by the user will be grouped on a timeline. The users can further share the images or albums privately or with a group of individuals. The photos are stored in the cloud and can be retrieved from offline systems as and when required. With PixelGram It's easier, safer, and quicker to efficiently store & share your captured moments online.

# Architecture:
PixelGram is a micro-service architecture-based application that enables users to upload, download, share and manage images. There is an end user who logins through the UI . The UI is built using react js and bootstrap. The front end communicates with the backend architecture using the GRPC protocol. We are using envoy proxy mediator as the GRPC web client does not send HTTP2 requests, so we convert them into HTTP2 using envoy. The GRPC helps in the inter service communication and the communication between react client and microservices.
The different microservices the we are using are:
The upload/download image service which enables a user to upload the images to the cloud as well as download the images into the local.
The image service enables the user to share the image data to different PixelGram users.
The user service enables a user to register and login into the application for uploading, downloading and sharing the images. There are also 3Rd party login methods such as IU login, GitHub login and Google login
The meta data service is present to get the meta data of an image like location, timestamp, file format, size etc.
The session management service is built to manage the session of user for better security after login.
The database service to connect to the data base and all the operations related to that.
All other services connect to database via this service.

![Architecture diagram](https://user-images.githubusercontent.com/29830913/108661175-2edd3780-7499-11eb-802d-515a67d5704c.jpg)

