export {};
import express from "express";

import lineupsRouter from "./get/getLineups";
import passesRouter from "./get/getPasses";
import competitionsRouter from "./get/getCompetitions";
import seasonsRouter from "./get/getSeasons";
import matchesRouter from "./get/getMatches";

const matchRouter = express.Router();

matchRouter.get("/", (req, res) => {
  res.send("hello from match");
});

matchRouter.use("/passes", passesRouter);
matchRouter.use("/lineups", lineupsRouter);
matchRouter.use("/competitions", competitionsRouter);
matchRouter.use("/seasons", seasonsRouter);
matchRouter.use("/matches", matchesRouter);

export default matchRouter;
