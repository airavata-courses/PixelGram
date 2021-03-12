This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Install
Run  : `npm install` 
This would install all the dependenices listed in `package.json`


### Run
Make sure you install yarn locally or globally.
`npm install -g yarn` 

Once in the project directory, you can use yarn to run the project with yarn: 
`yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.


### Install and Run the API Server 
This app works with an API + Authentication Server which can be found here: [https://github.com/mitni455/nodejs-jwt-authentication.git](https://github.com/mitni455/nodejs-jwt-authentication.git)

To get this running, please follow these steps:

`git clone https://github.com/mitni455/nodejs-jwt-authentication.git && cd $_`
`npm install`
`nodemon server.js`

The API server uses Mongo DB, so you will need to [install mongo](https://docs.mongodb.com/manual/installation/) then open another terminal tab and run:
`mongod`







