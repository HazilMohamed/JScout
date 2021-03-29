/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

import config from "../config";
import { TeamType, PlayerType, PassDetailsTypes } from "../types/types";
import { BodyInfo, HeightInfo, PlayPatternInfo } from "../helpers/passHelpers";

import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Paper,
  createStyles,
  Theme,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controller: {
      backgroundColor: "#dad873",
      textAlign: "center",
      display: "grid",
    },
    grid: {
      display: "block",
      padding: theme.spacing(2),
    },
    paperForm: {
      display: "block",
      alignItems: "left",
      justifyContent: "left",
      padding: theme.spacing(2),
      backgroundColor: "#454d66",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
      textAlign: "left",
    },
    items: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      justifyContent: "left",
      padding: theme.spacing(2),
    },
    formText: {
      padding: "3px 0",
      color: "#efeeb4",
    },
    paperContent: {
      color: "#efeeb4",
      textAlign: "left",
      margin: 10,
      "& h3": {
        textAlign: "center",
      },
      "& span": {
        fontWeight: "bold",
      },
    },
  })
);

const ControllerComponent: React.FC<{
  handleSubmit: Function;
  passData?: PassDetailsTypes;
}> = ({ handleSubmit, passData }) => {
  const api = config.api;
  const styles = useStyles();
  const [teams, setTeams] = useState<Array<TeamType>>();
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType>();

  const fetchLineUp = () => {
    axios.post(api + "/match/teams").then((res) => {
      const data = JSON.parse(res.data[0]);
      const fetched: Array<TeamType> = Object.values(data);
      setTeams(fetched);
      setSelectedTeam(fetched[0]);
      setSelectedPlayer(fetched[0].lineup[0]);
    });
  };

  const changeTeam = (id: string | unknown) => {
    const team = teams?.find((x) => x.team_id === Number(id));
    setSelectedTeam(team);
    setSelectedPlayer(team?.lineup[0]);
  };

  const changePlayer = (id: string | unknown) => {
    const newPlayer = selectedTeam?.lineup.find((x) => x.player_id === id);
    setSelectedPlayer(newPlayer);
  };

  useEffect(() => {
    fetchLineUp();
  }, []);

  return (
    <Paper elevation={5} className={styles.controller}>
      <h1>JScout</h1>
      <Grid direction={"row"} justify={"space-around"} xs={12}>
        <Grid xs={12} item className={styles.grid}>
          <Paper
            elevation={3}
            className={styles.paperForm}
            style={{ height: passData ? "320px" : "700px" }}
          >
            <form className={styles.form}>
              {teams && (
                <div className={styles.items}>
                  <InputLabel className={styles.formText} id="team-label">
                    Team
                  </InputLabel>
                  <Select
                    id="team"
                    name="team"
                    labelId="team-label"
                    value={selectedTeam?.team_id || teams[0].team_id}
                    onChange={(ev) => changeTeam(ev.target.value)}
                    className={styles.formText}
                  >
                    {teams.map((team: TeamType) => (
                      <MenuItem key={team.team_id} value={team.team_id}>
                        {team.team_name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
              {selectedTeam && (
                <div className={styles.items}>
                  <InputLabel className={styles.formText} id="players-label">
                    Player
                  </InputLabel>
                  <Select
                    id="players"
                    name="players"
                    labelId="players-label"
                    value={
                      selectedPlayer?.player_id ||
                      selectedTeam.lineup[0].player_id
                    }
                    onChange={(ev) => changePlayer(ev.target.value)}
                    className={styles.formText}
                  >
                    {selectedTeam.lineup.map((player) => (
                      <MenuItem key={player.player_id} value={player.player_id}>
                        {player.player_name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
              {selectedPlayer && (
                <div
                  className={styles.items}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmit(selectedPlayer.player_id)}
                  >
                    Search
                  </Button>
                </div>
              )}
            </form>
          </Paper>
        </Grid>
        {passData && (
          <Grid xs={12} item className={styles.grid}>
            <Paper
              elevation={3}
              className={styles.paperForm}
              style={{ height: "350px" }}
            >
              <Typography className={styles.paperContent}>
                <h3>Pass Data</h3>
                Pass Location: <span>{`(${passData.location})`}</span>
                <ArrowForward fontSize={"inherit"} />
                <span>{`(${passData?.pass_end_location})`}</span>
                <br />
                Recipient: <span>{passData?.pass_recipient_name}</span>
                <br />
                Time: <span>{passData?.timestamp}</span>
                <br />
                Period:{" "}
                <span>{`${
                  passData?.period === 1 ? "First" : "Second"
                }  Half`}</span>
                <br />
                Play Pattern:{" "}
                <span>
                  {
                    PlayPatternInfo.find(
                      (x) => x.id === passData?.play_pattern_id
                    )?.name
                  }
                </span>
                <br />
                Pass Height:{" "}
                <span>
                  {
                    HeightInfo.find((x) => x.id === passData?.pass_height_id)
                      ?.name
                  }
                </span>
                <br />
                Body Part:{" "}
                <span>
                  {
                    BodyInfo.find((x) => x.id === passData?.pass_body_part_id)
                      ?.name
                  }
                </span>
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default ControllerComponent;
