const Koa = require('koa');
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const HttpStatus = require("http-status");

const serve = require("koa-static");
const router = require('koa-route');
const mount = require("koa-mount");
const axios = require("axios");
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyn3fIZfJ9dEX8Px'}).base('appUdJOf889CrTa8y');


const app = new Koa();
const PORT = process.env.PORT || 3000;

/*
  This is the static part of the server:
   it serves the 'build' directory
*/
const static_pages = new Koa();
static_pages.use(serve(__dirname + "/../../build"));
app.use(mount("/", static_pages));

app.use(BodyParser());
app.use(Logger());
// const cors = require('./cors');
// app.use(cors);


/*
  This is the API / dynamic part of the application
*/

/*
  '/healthcheck' endpoint
  Returns "running" if everything is OK
*/
const healthcheck = router.get('/healthcheck',
  (ctx) => {
      console.log("Healthcheck handler", ctx.path);
      console.log(ctx.query);
      ctx.status = HttpStatus.OK;
      ctx.body = "Running";
})
app.use(healthcheck);

/*
  '/api/now' endpoint
  This endpoint will add info about our candidate
*/
const now = router.get('/api/now',
  (ctx) => {
      console.log('path: ', ctx.path);
      console.log('query: ', ctx.query);
      ctx.status = HttpStatus.OK;
      const date = new Date();
      ctx.body = `{"today": "${date}"}`;
})
app.use(now);

const healthcheck2 = router.get('/pepe',
  (ctx) => {
      console.log("Healthcheck handler", ctx.path);
      console.log(ctx.query);
      ctx.status = HttpStatus.OK;
      ctx.body = "pepe is home";
})
app.use(healthcheck2);


/*
  '/api/candidate' endpoint
  This is changed for a new wau
  This endpoint returns the actual date
*/
const new_cand = router.post('/api/candidates2',
   (ctx) => {
      // try {
      //     const record = await postCandidate();
      //     console.log('Retrieved', record.id);
      //     ctx.body = "Record ID from API: " + record.id;
      // } catch (err) {
      //     // handle exception
      // }

      // ctx.status = HttpStatus.OK;
      // // console.log('path: ', ctx.path);
      // // console.log('query: ', ctx.query);
      // console.log('body: ', ctx.request.body);
      // // // console.log('ctx: ', ctx);
      // // // ctx.status = HttpStatus.OK;
      // // // const date = new Date();
      // ctx.body = ctx.request.body;

      candidateObject = ctx.request.body;

      const config = {
       // mode: 'no-cors',
         headers: {
           'Content-Type': 'application/json',
           'Authorization':'Bearer keyn3fIZfJ9dEX8Px'
         }
       }

      // const records = postCandidate();
      // console.log("records:",records);
      // ctx.status = HttpStatus.OK;
      // ctx.body = ctx.request.body;

        axios
      .post('https://api.airtable.com/v0/appUdJOf889CrTa8y/candidates',candidateObject,config)
      .then(res => {
        ctx.status = HttpStatus.OK;
        console.log(res.data);

      })
      .catch(function (error) {
      console.log(error);
      })
    // ctx.preventDefault()

      // You can also read other commands to AirTable here: https://flaviocopes.com/airtable/

})
app.use(new_cand);

app.use(router.post('/api/candidates', async function (ctx) {
  try {
    const record = await postCandidate();
    console.log(`Retrieved ${records.length} records`);
    ctx.status = HttpStatus.OK;
    ctx.body = ctx.request.body;
    let candidateList = record
    // let candidateList = [];
    // records.forEach((record) => {
    //   playersList.push({
    //     "name": record.fields.name,
    //     "age": false
    //   });
    // });

    ctx.body = candidateList;
  } catch (err) {
    console.log('Got an error: ', err);
    ctx.body = "Failed :( ";
    // handle exception
  }
}));

function postCandidate() {
  return new Promise((resolve, reject) => {
    base('candidates').create([
      {
        "fields": {
          "name": "carlos gomez",
          "age": 21
        }
      }
    ], function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      // records.forEach(function (record) {
        console.log(record);
        // return record.getId()
      // });
    });
  });
}
/*
 This is where we start the server
*/
app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
