import express from "express";
import { PythonShell } from "python-shell";
const passesRouter = express.Router();

passesRouter.get("/", (req, res) => {
  res.send("hello from passes");
});

passesRouter.post("/", (req, res) => {
  const pythonOptions = {
    args: [String(req.body.matchId), String(req.body.playerId)],
    scriptPath: "./src/python/",
  };
  PythonShell.run("./getPasses.py", pythonOptions, function (err, out) {
    if (err) {
      res.json(err);
    }
    if (out) {
      res.json(out);
    }
  });
});

export default passesRouter;
