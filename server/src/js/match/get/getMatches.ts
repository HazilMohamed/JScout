import express from "express";
import { PythonShell } from "python-shell";

const matchesRouter = express.Router();

matchesRouter.get("/", (req, res) => {
  res.send("hello from Matches");
});

matchesRouter.post("/", (req, res) => {
  const pythonOptions = {
    args: [String(req.body.compId), String(req.body.seasonId)],
    scriptPath: "./src/python/",
  };
  PythonShell.run("./getMatches.py", pythonOptions, function (err, out) {
    if (err) {
      res.json(err);
    }
    if (out) {
      res.json(out);
    }
  });
});

export default matchesRouter;
