import express from "express";
import { PythonShell } from "python-shell";

const lineupsRouter = express.Router();

lineupsRouter.get("/", (req, res) => {
  res.send("hello from Lineups");
});

lineupsRouter.post("/", (req, res) => {
  const pythonOptions = {
    args: [String(req.body.matchId)],
    scriptPath: "./src/python/",
  };
  PythonShell.run("./getLineups.py", pythonOptions, function (err, out) {
    if (err) {
      res.json(err);
    }
    if (out) {
      res.json(out);
    }
  });
});

export default lineupsRouter;
