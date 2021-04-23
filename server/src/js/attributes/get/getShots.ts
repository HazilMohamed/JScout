import express from "express";
import { PythonShell } from "python-shell";
import { ReturnType } from "../../../../types";

const shotsRouter = express.Router();

shotsRouter.get("/", (req, res) => {
  res.send("hello from shots");
});

shotsRouter.post("/", (req, res) => {
  let response: ReturnType;
  if (!req.body.matchId || !req.body.playerId) {
    response = {
      success: false,
      message: "Pass matchId, playerId as arguments",
    };
    res.json(response);
  } else {
    const pythonOptions = {
      args: [String(req.body.matchId), String(req.body.playerId)],
      scriptPath: "./src/python/",
    };
    PythonShell.run("./getShots.py", pythonOptions, function (err, out) {
      if (err) {
        response = {
          success: false,
          message: "Something went wrong",
          data: err,
        };
      }
      if (out) {
        if (Number(out) === 103) {
          response = {
            success: false,
            message: "Match not found",
          };
        } else if (Number(out) === 104) {
          response = {
            success: false,
            message: "Player not found",
          };
        } else {
          response = {
            success: true,
            message: "Queried successfully",
            data: out,
          };
        }
      }
      res.json(response);
    });
  }
});

export default shotsRouter;
