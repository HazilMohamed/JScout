import express from "express";
import { PythonShell } from "python-shell";
import { ReturnType } from "../../../types";

const competitionsRouter = express.Router();

competitionsRouter.get("/", (req, res) => {
  res.send("hello from competitions");
});

competitionsRouter.post("/", (req, res) => {
  let response: ReturnType;
  const pythonOptions = {
    scriptPath: "./src/python/",
  };
  PythonShell.run("./getCompetitions.py", pythonOptions, function (err, out) {
    if (err) {
      response = {
        success: false,
        message: "Something went wrong",
      };
    }
    if (out) {
      response = {
        success: true,
        message: "Queried successfully",
        data: out,
      };
    }
    res.json(response);
  });
});

export default competitionsRouter;
