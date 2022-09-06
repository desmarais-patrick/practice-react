import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../components/app";

const server = express();
server.use(express.static("dist"));

server.get("/", (req, res) => {
    const initialMarkup = ReactDOMServer.renderToString(<App />);

    res.send(`
    <html>
      <head>
        <title>Sample React App</title>
      </head>
      <body>
        <div id="app">${initialMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `)
});

server.listen(8080, () => console.log("Server is running..."));