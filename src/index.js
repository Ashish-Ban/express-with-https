const fs = require('fs');
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const https = require("https");
const http = require("http");  // only import if you need http server

const cert = fs.readFileSync(__dirname + "/cert.pem", 'utf8');
const key = fs.readFileSync(__dirname + "/selfsigned.key", 'utf8');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
    return res.send("Hello welcome to the route, it works !")
});

const httpServer = http.createServer(app);  // create http server if you want !
const httpsServer = https.createServer({
    key,
    cert
}, app);
httpServer.listen(8000); // for handling http traffic
httpsServer.listen(8043, 'localhost', () => {
    console.log("HTTPS server running on https://localhost:8043");
});