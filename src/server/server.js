const Koa = require('koa');
const BodyParser = require("koa-bodyparser");
const Logger = require("koa-logger");
const HttpStatus = require("http-status");

const serve = require("koa-static");
const router = require('koa-route');
const mount = require("koa-mount");


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
  This endpoint returns the actual date
*/
const new_cand = router.post('/api/candidates',
  (ctx) => {
      ctx.status = HttpStatus.OK;
      console.log('path: ', ctx.path);
      console.log('query: ', ctx.query);
      console.log('body: ', ctx.request.body);
      console.log('ctx: ', ctx);
      // ctx.status = HttpStatus.OK;
      const date = new Date();
      ctx.body = ctx.request.body;
})
app.use(new_cand);

/*
 This is where we start the server
*/
app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
