/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

import config from "../config";
import { TeamType, PlayerType } from "../types/types";

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
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controller: {
      backgroundColor: "#9c7474",
      textAlign: "center",
      display: "grid",
    },
    grid: {
      padding: theme.spacing(1),
    },
    paperForm: {
      display: "block",
      alignItems: "left",
      justifyContent: "left",
      padding: theme.spacing(2),
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
  })
);

const ControllerComponent: React.FC<{ handleSubmit: Function }> = ({
  handleSubmit,
}) => {
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
    <Paper className={styles.controller}>
      <h1>JScout</h1>
      <Grid direction={"column"} xs={12} justify={"center"}>
        <Grid xs={12} item className={styles.grid}>
          <Paper className={styles.paperForm} style={{}}>
            <form className={styles.form}>
              {teams && (
                <div className={styles.items}>
                  <InputLabel style={{ padding: "3px 0" }} id="team-label">
                    Team
                  </InputLabel>
                  <Select
                    id="team"
                    name="team"
                    labelId="team-label"
                    value={selectedTeam?.team_id || teams[0].team_id}
                    onChange={(ev) => changeTeam(ev.target.value)}
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
                  <InputLabel style={{ padding: "3px 0" }} id="players-label">
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
      </Grid>
    </Paper>
  );
};

export default ControllerComponent;
