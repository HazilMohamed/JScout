import express from "express";
import { PythonShell } from "python-shell";

const seasonsRouter = express.Router();

seasonsRouter.get("/", (req, res) => {
  res.send("hello from competitions");
});

seasonsRouter.post("/", (req, res) => {
  const pythonOptions = {
    args: [String(req.body.compId)],
    scriptPath: "./src/python/",
  };
  PythonShell.run("./getSeasons.py", pythonOptions, function (err, out) {
    if (err) {
      res.json(err);
    }
    if (out) {
      res.json(out);
    }
  });
});

export default seasonsRouter;
