import express from "express";
import { PythonShell } from "python-shell";
import { ReturnType } from "../../../types";

const lineupsRouter = express.Router();

lineupsRouter.get("/", (req, res) => {
  res.send("hello from Lineups");
});

lineupsRouter.post("/", (req, res) => {
  let response: ReturnType;
  if (!req.body.matchId) {
    response = {
      success: false,
      message: "Pass matchId as argument",
    };
    res.json(response);
  } else {
    const pythonOptions = {
      args: [String(req.body.matchId)],
      scriptPath: "./src/python/",
    };
    PythonShell.run("./getLineups.py", pythonOptions, function (err, out) {
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

export default lineupsRouter;
