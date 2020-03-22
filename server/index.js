import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { serverLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;
const html = fs.readFileSync("dist/index.html").toString();
const parts = html.split("not rendered"); // split content to append the server rendered data as follows

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  const reactMarkup = (
    <serverLocation>
      <App />
    </serverLocation>
  );

  res.send(`${parts[0]} ${renderToString(reactMarkup)} ${parts[1]}`);
});

console.log(`Port listening on ${PORT}`);
app.listen(PORT);
