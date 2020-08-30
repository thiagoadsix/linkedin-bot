# LinkedinBot
On this repository we have some codes, and not just codes, but codes tested with **Jest**.

## What is the project?
The idea of this project, is to create a bot that could send messages to many user on Linkedin.

### Dependencies
  + express
  + nodemon
  + puppeteer
  
#### To start the project, run:

> npm install

> npm run dev

#### To use the project, it is necessary to have the insomnia or the postman or whatever you want to use to make the request. So far the project can only search for users by a profession (Design) and a country (Italy), and this is not yet dynamic, yet.
> Route type: GET

> {
    "username": "your user or email",
    "password": "your password"
}
