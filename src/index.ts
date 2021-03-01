// const express = require("express");
import express from "express";
import { PythonShell } from "python-shell";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello world!");
  PythonShell.run("./src/hello.py", null, function (err, res) {
    if (err) throw err;
    if (res) console.log(res);
  });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
