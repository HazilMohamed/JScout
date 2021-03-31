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
      padding: theme.spacing(5),
    },
  })
);

const MatchAnalysis = () => {
  const api = config.api;
  const [passDetails, setPassDetails] = useState<Array<PassDetailsTypes>>();
  const [selectedPass, setSelectedPass] = useState<PassDetailsTypes>();
  const styles = useStyles();

  const handleSubmit = (matchId: number, playerId: number) => {
    axios
      .post(api + "/match/passes", { matchId: matchId, playerId: playerId })
      .then((res) => {
        const data = JSON.parse(res.data[0]);
        setPassDetails(Object.values(data));
      });
  };

  const getPassData = (ev: PassDetailsTypes) => {
    setSelectedPass(ev);
  };

  return (
    <Grid container className={styles.grid} justify={"space-evenly"}>
      <Grid xs={8} item>
        <ViewComponent passDetails={passDetails} getPassData={getPassData} />
      </Grid>
      <Grid xs={3} item>
        <ControllerComponent
          handleSubmit={handleSubmit}
          passData={selectedPass}
        />
      </Grid>
    </Grid>
  );
};

export default MatchAnalysis;
