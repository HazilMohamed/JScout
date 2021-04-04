import express from "express";
import { PythonShell } from "python-shell";
import { ReturnType } from "../../../types";

const matchesRouter = express.Router();

matchesRouter.get("/", (req, res) => {
  res.send("hello from Matches");
});

matchesRouter.post("/", (req, res) => {
  let response: ReturnType;
  if (!req.body.compId || !req.body.seasonId) {
    response = {
      success: false,
      message: "Pass compId, seasonId as arguments",
    };
    res.json(response);
  } else {
    const pythonOptions = {
      args: [String(req.body.compId), String(req.body.seasonId)],
      scriptPath: "./src/python/",
    };
    PythonShell.run("./getMatches.py", pythonOptions, function (err, out) {
      if (err) {
        response = {
          success: false,
          message: "Something went wrong",
          data: err,
        };
      }
      if (out) {
        if (Number(out) === 102) {
          response = {
            success: false,
            message: "Season or Competition not found",
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

export default matchesRouter;
