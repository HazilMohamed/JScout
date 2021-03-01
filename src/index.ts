// const express = require("express");
import express from "express";
import { PythonShell } from "python-shell";

const app = express();
const port = 8080;

app.get("/match", (req, res) => {
  res.send("Hello world!");
  const pythonOptions = {
    args: [String(req.query.minute)],
    scriptPath: "./src/python/",
  };
  PythonShell.run("./match.py", pythonOptions, function (err, out) {
    if (err) console.log(err);
    if (out) console.log(out);
  });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
