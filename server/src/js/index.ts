import express from "express";
import cors from "cors";

import matchRouter from "./match/matchRouter";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hello from root");
});

app.use(cors());
app.use(express.json());

app.use("/match", matchRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
