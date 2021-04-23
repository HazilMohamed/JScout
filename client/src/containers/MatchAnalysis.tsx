import { useState } from "react";
import axios from "axios";

import ControllerComponent from "../components/ControllerComponent";
import ViewComponent from "../components/ViewComponent";
import config from "../config";
import { PassDetailsTypes } from "../types/types";

import { Grid, createStyles, Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerGrid: {
      padding: theme.spacing(6),
    },
    innerGrid: {
      padding: theme.spacing(4),
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
      .post(api + "/match/attributes/passes", {
        matchId: matchId,
        playerId: playerId,
      })
      .then((res) => {
        if (res.data && res.data.success) {
          const data = JSON.parse(res.data.data[0]);
          setPassDetails(Object.values(data));
        } else {
          console.log(res.data.message);
        }
      });
  };

  const getPassData = (ev: PassDetailsTypes) => {
    setSelectedPass(ev);
  };

  return (
    <Grid
      container
      className={styles.outerGrid}
      justify={"space-evenly"}
      alignItems={"center"}
    >
      <Grid lg={9} md={9} sm={12} xs={12} item className={styles.innerGrid}>
        <ViewComponent passDetails={passDetails} getPassData={getPassData} />
      </Grid>
      <Grid lg={3} md={3} sm={12} xs={12} item className={styles.innerGrid}>
        <ControllerComponent
          handleSubmit={handleSubmit}
          passData={selectedPass}
        />
      </Grid>
    </Grid>
  );
};

export default MatchAnalysis;
