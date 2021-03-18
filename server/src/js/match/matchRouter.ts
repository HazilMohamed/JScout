export {};
import express from "express";

import playerRouter from "./get/getPlayerDetails";
import teamsRouter from "./get/getTeams";

const matchRouter = express.Router();

matchRouter.get("/", (req, res) => {
  res.send("hello from match");
});

matchRouter.use("/player", playerRouter);
matchRouter.use("/teams", teamsRouter);

export default matchRouter;
