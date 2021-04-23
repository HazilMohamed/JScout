import express from "express";

import attributesRouter from "../attributes/attributesRouter";
import lineupsRouter from "./get/getLineups";
import competitionsRouter from "./get/getCompetitions";
import seasonsRouter from "./get/getSeasons";
import matchesRouter from "./get/getMatches";

const matchRouter = express.Router();

matchRouter.get("/", (req, res) => {
  res.send("hello from match");
});

matchRouter.use("/lineups", lineupsRouter);
matchRouter.use("/competitions", competitionsRouter);
matchRouter.use("/seasons", seasonsRouter);
matchRouter.use("/matches", matchesRouter);
matchRouter.use("/attributes", attributesRouter);

export default matchRouter;
