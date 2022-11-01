# Learn how to set up express with HTTPS server

For this it is assumed that you have installed openssl. If not find and install openssl from [here](https://www.openssl.org/source/)

## Try it yourself !
Clone this repo and generate the keys as mentioned below, install libraries with `npm install` or `yarn`.Then run `npm run dev` or `yarn run dev` to start the server.
<br>
##### Note: In this repo the `cert.pem` and `selfsigned.key` should be inside the `src` directory, which is where our `index.js` is.

## Generating Keys

```cmd
cd src
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt
```

Save the key as it is and convert the certificate to pem file using below cmd

```cmd
cd src
sudo openssl x509 -in .\selfsigned.crt -out cert.pem
```

## Express

Express js code ! ( You should use certificate, keys and other credentials safely on production environment, also setup necessary environment variables and use them.)

```js
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const https = require("https");
const http = require("http"); // only import if you need http server

const cert = fs.readFileSync(__dirname + "/cert.pem", "utf8");
const key = fs.readFileSync(__dirname + "/selfsigned.key", "utf8");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  return res.send("Hello welcome to the route, it works !");
});

const httpServer = http.createServer(app); // create http server if you want !
const httpsServer = https.createServer(
  {
    key,
    cert,
  },
  app
);
httpServer.listen(8000); // for handling http traffic
httpsServer.listen(8043, "localhost", () => {
  console.log("HTTPS server running on https://localhost:8043");
});
```

This will get you running with express on https. Also remember if you are using load balancer and reverse proxy like nginx,
it may require chaning some configuration in load balancer or reverse proxy. This code works on Windows (for local development, for production, should set up necessary firewall rules)
and on linux.

Learn. Enjoy. Share. ❤️