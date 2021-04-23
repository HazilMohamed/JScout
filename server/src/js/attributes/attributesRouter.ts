import express from "express";

import passesRouter from "./get/getPasses";

const attributesRouter = express.Router();

attributesRouter.get("/", (req, res) => {
  res.send("hello from attributes");
});

attributesRouter.use("/passes", passesRouter);

export default attributesRouter;
