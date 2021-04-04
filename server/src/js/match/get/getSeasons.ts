import express from "express";
import { PythonShell } from "python-shell";
import { ReturnType } from "../../../types";

const seasonsRouter = express.Router();

seasonsRouter.get("/", (req, res) => {
  res.send("hello from competitions");
});

seasonsRouter.post("/", (req, res) => {
  let response: ReturnType;
  if (!req.body.compId) {
    response = {
      success: false,
      message: "Pass compId as argument",
    };
    res.json(response);
  } else {
    const pythonOptions = {
      args: [String(req.body.compId)],
      scriptPath: "./src/python/",
    };
    PythonShell.run("./getSeasons.py", pythonOptions, function (err, out) {
      if (err) {
        response = {
          success: false,
          message: "Something went wrong",
          data: err,
        };
      }
      if (out) {
        if (Number(out) === 101) {
          response = {
            success: false,
            message: "Competition not found",
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

export default seasonsRouter;
