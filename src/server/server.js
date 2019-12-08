const Koa = require('koa');
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const HttpStatus = require("http-status");
// const cors = require('koa-cors');
const serve = require("koa-static");
const router = require('koa-route');
const mount = require("koa-mount");
const axios = require("axios");
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyn3fIZfJ9dEX8Px' }).base('appUdJOf889CrTa8y');


const app = new Koa();
const PORT = process.env.PORT || 3000;

/*
  This is the static part of the server:
   it serves the 'build' directory
*/
const static_pages = new Koa();
// app.use(cors);
static_pages.use(serve(__dirname + "/../../build"));
app.use(mount("/", static_pages));

app.use(BodyParser());
app.use(Logger());
// const cors = require('./cors');



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
retrieve candidates

*/
const listCand = router.get('/api/listcandidates',
  async (ctx) => {
    try {
      const records = await getCandidates();
      let candidatesList = [];
      records.forEach((record) => {
        candidatesList.push({
          "name": record.fields.name,
          "age": record.fields.age
        });
      });
      ctx.body = candidatesList;
  } catch (err) {
      // handle exception
    console.log('Got an error: ', err);
    ctx.body = "Failed :( ";
  }
})
app.use(listCand);

// app.use(router.get('/api/listcandidates', async function (ctx) {
//     /* please check return value if it returns correct value. */
//     try {
//         const record = await getCandidates();
//         console.log('Retrieved', record.id);
//         ctx.body = "Record ID from API: " + record.id;
//     } catch (err) {
//         // handle exception
//     }
// }));




/*
  '/api/candidate' endpoint
  This is changed for a new wau
  This endpoint returns the actual date
*/
const new_cand = router.post('/api/candidates2',
   (ctx) => {
      candidateObject = ctx.request.body;

      const config = {
       // mode: 'no-cors',
         headers: {
           'Content-Type': 'application/json',
           'Authorization':'Bearer keyn3fIZfJ9dEX8Px'
         }
       }
        axios
      .post('https://api.airtable.com/v0/appUdJOf889CrTa8y/candidates',candidateObject,config)
      .then(res => {
        ctx.status = HttpStatus.OK;
        //console.log(res.data);
        console.log('Got some data, POST is finished !');
        ctx.body = 'OK';
      }).then(() => {
        console.log('returning OK');
        ctx.body = 'OK2';
      }
      )
      .catch(function (error) {
        console.log(error);
      })
    // ctx.preventDefault()

    // You can also read other commands to AirTable here: https://flaviocopes.com/airtable/

  })
app.use(new_cand);

app.use(router.post('/api/candidates', async function (ctx) {
  try {
    const record = await postCandidate(ctx.request.body);
    ctx.status = HttpStatus.OK;
    ctx.body = '{"status": 200, "message": "Content saved in the database"}';
    let candidateList = record
  } catch (err) {
    console.log('Got an error: ', err);
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = '{"status": 500, "message": "Could not save the data"}';
  }
}));

function postCandidate(newCandidate) {
  return new Promise((resolve, reject) => {
    base('candidates').create(newCandidate, function(err, record) {
      if (err) {
        console.error(err);
        reject(err);
      }
      else {
      // records.forEach(function (record) {
        // console.log(record);
        console.log('Retrieved', record);
        resolve(record);
      // });
      }
    });
  });
}

function getCandidates() {
  return new Promise((resolve, reject) => {
    base('candidates').select({
      view: 'Grid view'
    }).firstPage(function(err, records) {
        if (err) {
          console.error(err);
          reject(err);
        }
        else {
          // records.forEach(function(record) {
          //     console.log('Retrieved', record.get('id_candidates'));
          // });
          resolve(records);
        }
    });
  });
}
/*
 This is where we start the server
*/
app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
