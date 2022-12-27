const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const port = 443;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync("./local-dev/https-cert/jwst.dev-key.pem"),
    cert: fs.readFileSync("./local-dev/https-cert/jwst.dev.pem")
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log('ready - started server on url: https://jwst.dev');
    });
});