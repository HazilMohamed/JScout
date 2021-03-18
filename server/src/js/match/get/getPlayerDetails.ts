import express from "express";
import { PythonShell } from "python-shell";
const playerRouter = express.Router();

playerRouter.get("/", (req, res) => {
  res.send("hello from player data");
});

playerRouter.post("/", (req, res) => {
  const pythonOptions = {
    args: [String(req.body.player)],
    scriptPath: "./src/python/",
  };
  PythonShell.run("./player.py", pythonOptions, function (err, out) {
    if (err) {
      res.json(err);
    }
    if (out) {
      res.json(out);
    }
  });
});

export default playerRouter;
