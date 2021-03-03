import express from "express";
import { PythonShell } from "python-shell";
const matchRouter = express.Router();

matchRouter.get("/", (req, res) => {
  res.send("hello from match");
});

matchRouter.post("/", (req, res) => {
  const pythonOptions = {
    args: [String(req.body.player)],
    scriptPath: "./src/python/",
  };
  PythonShell.run("./match.py", pythonOptions, function (err, out) {
    if (err) {
      res.json(err);
    }
    if (out) {
      res.json(out);
    }
  });
});

export default matchRouter;
