const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db-sample.json"));
const middlewares = jsonServer.defaults();
const customersRouters = require("./routes.js");

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

function serverRewrite() {
  server.use(jsonServer.rewriter(customersRouters));
}

function runServer() {
  server.use(router);
}

server.use((req, res, next) => {
  // if (isAuthorized(req, res)) {
  next();
  // } else {
  //   res.sendStatus(401);
  // }
});

function isAuthorized(req, res) {
  if (req.url === "/refresh") {
    var authHeader = req.body.refresh_token;
    const jwtToken = JSON.parse(
      Buffer.from(authHeader.split(".")[1], "base64")
    );
    const tokenExpired = Date.now() > jwtToken.exp * 1000;
    if (tokenExpired) return false;
    return true;
  }
  var authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer fake-jwt-token"))
    return true;
  // check if token is expired
  const jwtToken = JSON.parse(Buffer.from(authHeader.split(".")[1], "base64"));
  const tokenExpired = Date.now() > jwtToken.exp * 1000;
  if (tokenExpired) return false;
  return true;
}

router.render = (req, res) => {
  res.jsonp({
    code: 200,
    data: res.locals.data,
    msg: "ok",
  });
};

require("./middleware")(server, router);

setTimeout(() => {
  serverRewrite();
  runServer();
}, 100);

server.listen(3000, () => {
  console.log("JSON Server is running on port 3000!");
});
