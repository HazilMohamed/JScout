import { useState } from "react";
import axios from "axios";

import ControllerComponent from "../components/ControllerComponent";
import ViewComponent from "../components/ViewComponent";
import config from "../config";
import { PassDetailsTypes } from "../types/types";

import { Grid, createStyles, Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      padding: theme.spacing(3),
    },
  })
);

const MatchAnalysis = () => {
  const api = config.api;
  const [passDetails, setPassDetails] = useState<Array<PassDetailsTypes>>();
  const styles = useStyles();

  const handleSubmit = (id: number) => {
    axios.post(api + "/match/player", { id: id }).then((res) => {
      const data = JSON.parse(res.data[0]);
      setPassDetails(Object.values(data));
    });
  };

  return (
    <Grid container xs={12} justify={"center"}>
      <Grid xs={9} className={styles.grid} item>
        <ViewComponent passDetails={passDetails} />
      </Grid>
      <Grid xs={3} className={styles.grid} item>
        <ControllerComponent handleSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
};

export default MatchAnalysis;
