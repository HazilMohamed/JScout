import express from "express";
import { PythonShell } from "python-shell";

const teamsRouter = express.Router();

teamsRouter.get("/", (req, res) => {
  res.send("hello from teams data");
});

teamsRouter.post("/", (req, res) => {
  const pythonOptions = {
    scriptPath: "./src/python/",
  };
  PythonShell.run("./teams.py", pythonOptions, function (err, out) {
    if (err) {
      res.json(err);
    }
    if (out) {
      res.json(out);
    }
  });
});

export default teamsRouter;
