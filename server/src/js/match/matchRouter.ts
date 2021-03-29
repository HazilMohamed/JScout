export {};
import express from "express";

import playerRouter from "./get/getPlayerDetails";
import teamsRouter from "./get/getTeams";
import competitionsRouter from "./get/getCompetitions";
import seasonsRouter from "./get/getSeasons";

const matchRouter = express.Router();

matchRouter.get("/", (req, res) => {
  res.send("hello from match");
});

matchRouter.use("/player", playerRouter);
matchRouter.use("/teams", teamsRouter);
matchRouter.use("/competitions", competitionsRouter);
matchRouter.use("/seasons", seasonsRouter);

export default matchRouter;
