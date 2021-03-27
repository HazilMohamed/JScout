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
      paddingBlock: theme.spacing(5),
    },
  })
);

const MatchAnalysis = () => {
  const api = config.api;
  const [passDetails, setPassDetails] = useState<Array<PassDetailsTypes>>();
  const [selectedPass, setSelectedPass] = useState<PassDetailsTypes>();
  const styles = useStyles();

  const handleSubmit = (id: number) => {
    axios.post(api + "/match/player", { id: id }).then((res) => {
      const data = JSON.parse(res.data[0]);
      setPassDetails(Object.values(data));
    });
  };

  const getPassData = (ev: PassDetailsTypes) => {
    setSelectedPass(ev);
  };
  console.log(passDetails);
  return (
    <Grid
      container
      xs={12}
      className={styles.grid}
      justify={"space-between"}
      spacing={5}
    >
      <Grid xs={9} item>
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
