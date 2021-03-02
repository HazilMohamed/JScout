import express from "express";
import bodyParser from "body-parser";

import matchRouter from "./match/getMatchDetails";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hello from root");
});
app.use(bodyParser.json());
app.use("/match", matchRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
