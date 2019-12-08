# We Ignite Tech candidates

Our application will allow submissions of candidates to the We Ignite program. And store the information in a simple DB in Airtable.

## Technical architecture
The application is composed of:
 - a front-end in react, served by a Koa server
 - a back-end API to airtable DB
 - a configuration to run on CircleCI (TODO: Not implemented yet!)
 - integration/unit testing in Cypress in folder cypress/integration/weiform-input.spec.js

The backend API has two endpoints:
 - `/api/candidates` post endpoint to add a candidate
 - `/api/listcandidates` json with the candidates
 - `/healthcheck` returns the String 'RUNNING'


## Available Scripts (npm)

### `npm start`

Start the application in development mode (with _runtime reload_)

### `npm test`

Runs all the test

### `npm run-script build`

This command will build your application into the `/build` folder

### `node src/server/server.js`


This will run your application as it should run on the server. You need to run the build before that (`npm run-script build`)
The static part of the serve will serve files located into the `build` folder.

## Local testing

Open [http://localhost:3000](http://localhost:3000) to view it in the browser

Use Postman to test the API enpoints available like [http://localhost:3000/api/now](http://localhost:3000/api/now) for example

## References
https://medium.com/hackernoon/serving-react-and-koa-together-720ba6668298

## Integration and unit testing
### `npm run cypress`
There are several tests:
weiform-input : fills and sends the form
weipost-form : test the Koa enpoints to POST and to get
wei-responsive : shows the app in different sizes to see how it will look

This command will build run the cypress tests.
