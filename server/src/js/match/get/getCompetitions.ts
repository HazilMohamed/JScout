import express from "express";
import { PythonShell } from "python-shell";

const competitionsRouter = express.Router();

competitionsRouter.get("/", (req, res) => {
  res.send("hello from competitions");
});

competitionsRouter.post("/", (req, res) => {
  const pythonOptions = {
    scriptPath: "./src/python/",
  };
  PythonShell.run("./getCompetitions.py", pythonOptions, function (err, out) {
    if (err) {
      res.json(err);
    }
    if (out) {
      res.json(out);
    }
  });
});

export default competitionsRouter;
