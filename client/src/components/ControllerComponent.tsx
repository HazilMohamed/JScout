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
  Typography,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";

import useStyles from "../styles/ControllerStyles";

interface SelectedOptions {
  competition?: any;
  season?: any;
  match?: any;
  team?: TeamType;
  player?: PlayerType;
}

const ControllerComponent: React.FC<{
  handleSubmit: Function;
  passData?: PassDetailsTypes;
}> = ({ handleSubmit, passData }) => {
  const api = config.api;
  const styles = useStyles();
  const [competitions, setCompetitions] = useState<Array<any>>();
  const [seasons, setSeasons] = useState<Array<any>>();
  const [matches, setMatches] = useState<Array<any>>();
  const [teams, setTeams] = useState<Array<TeamType>>();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>();

  const fetchCompetitions = () => {
    axios.post(api + "/match/competitions").then((res) => {
      const data = JSON.parse(res.data[0]);
      const fetched = Object.values(data);
      setCompetitions(fetched);
    });
  };

  const fetchSeasons = () => {
    axios
      .post(api + "/match/seasons", {
        compId: selectedOptions?.competition.competition_id,
      })
      .then((res) => {
        const data = JSON.parse(res.data[0]);
        const fetched = Object.values(data);
        setSeasons(fetched);
      });
  };

  const fetchMatches = () => {
    axios
      .post(api + "/match/matches", {
        compId: selectedOptions?.competition.competition_id,
        seasonId: selectedOptions?.season.season_id,
      })
      .then((res) => {
        const data = JSON.parse(res.data[0]);
        const fetched = Object.values(data);
        setMatches(fetched);
      });
  };

  const fetchLineUp = () => {
    axios
      .post(api + "/match/lineups", {
        matchId: selectedOptions?.match.match_id,
      })
      .then((res) => {
        const data = JSON.parse(res.data[0]);
        const fetched: Array<TeamType> = Object.values(data);
        setTeams(fetched);
      });
  };

  const changeCompetition = (id: string | unknown) => {
    const comp = competitions?.find((x) => x.competition_id === Number(id));
    setSelectedOptions({
      ...selectedOptions,
      competition: comp,
    });
  };

  const changeSeason = (id: string | unknown) => {
    const season = seasons?.find((x) => x.season_id === Number(id));
    setSelectedOptions({
      ...selectedOptions,
      season: season,
    });
  };

  const changeMatch = (id: string | unknown) => {
    const match = matches?.find((x) => x.match_id === Number(id));
    setSelectedOptions({
      ...selectedOptions,
      match: match,
    });
  };

  const changeTeam = (id: string | unknown) => {
    const team = teams?.find((x) => x.team_id === Number(id));
    setSelectedOptions({
      ...selectedOptions,
      team: team,
    });
  };

  const changePlayer = (id: string | unknown) => {
    const newPlayer = selectedOptions?.team?.lineup.find(
      (x) => x.player_id === id
    );
    setSelectedOptions({
      ...selectedOptions,
      player: newPlayer,
    });
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  useEffect(() => {
    if (selectedOptions?.competition) {
      fetchSeasons();
    }
    if (selectedOptions?.season) {
      fetchMatches();
    }
    if (selectedOptions?.match) {
      fetchLineUp();
    }
  }, [
    selectedOptions?.competition,
    selectedOptions?.season,
    selectedOptions?.match,
  ]);

  return (
    <Paper elevation={5} className={styles.controller}>
      <h1>JScout</h1>
      <Grid container direction={"row"} justify={"space-around"}>
        <Grid xs={12} item className={styles.grid}>
          <Paper
            elevation={3}
            className={styles.paperForm}
            style={{ height: passData ? "320px" : "700px" }}
          >
            <form className={styles.form}>
              {competitions && (
                <div className={styles.items}>
                  <InputLabel
                    className={styles.formText}
                    id="competition-label"
                  >
                    Competition
                  </InputLabel>
                  <Select
                    id="competition"
                    name="competition"
                    labelId="competition-label"
                    value={selectedOptions?.competition?.competition_id}
                    onChange={(ev) => changeCompetition(ev.target.value)}
                    className={styles.formText}
                  >
                    {competitions.map((comp: any) => (
                      <MenuItem
                        key={comp.competition_id}
                        value={comp.competition_id}
                      >
                        {comp.competition_name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
              {selectedOptions?.competition && seasons && (
                <div className={styles.items}>
                  <InputLabel className={styles.formText} id="season-label">
                    Season
                  </InputLabel>
                  <Select
                    id="season"
                    name="season"
                    labelId="season-label"
                    value={selectedOptions.season?.season_id}
                    onChange={(ev) => changeSeason(ev.target.value)}
                    className={styles.formText}
                  >
                    {seasons.map((season: any) => (
                      <MenuItem key={season.season_id} value={season.season_id}>
                        {season.season_name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
              {selectedOptions?.season && matches && (
                <div className={styles.items}>
                  <InputLabel className={styles.formText} id="matches-label">
                    Matches
                  </InputLabel>
                  <Select
                    id="matches"
                    name="matches"
                    labelId="matches-label"
                    value={selectedOptions.match?.match_id}
                    onChange={(ev) => changeMatch(ev.target.value)}
                    className={styles.formText}
                  >
                    {matches.map((match) => (
                      <MenuItem key={match.match_id} value={match.match_id}>
                        {`${match.home_team_home_team_name} vs ${match.away_team_away_team_name}`}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
              {selectedOptions?.match && teams && (
                <div className={styles.items}>
                  <InputLabel className={styles.formText} id="team-label">
                    Team
                  </InputLabel>
                  <Select
                    id="team"
                    name="team"
                    labelId="team-label"
                    value={selectedOptions.team?.team_id}
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
              {selectedOptions?.team && (
                <div className={styles.items}>
                  <InputLabel className={styles.formText} id="players-label">
                    Player
                  </InputLabel>
                  <Select
                    id="players"
                    name="players"
                    labelId="players-label"
                    value={selectedOptions.player?.player_id}
                    onChange={(ev) => changePlayer(ev.target.value)}
                    className={styles.formText}
                  >
                    {selectedOptions.team.lineup.map((player) => (
                      <MenuItem key={player.player_id} value={player.player_id}>
                        {player.player_name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
              {selectedOptions?.player && (
                <div
                  className={styles.items}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleSubmit(
                        selectedOptions?.match?.match_id,
                        selectedOptions?.player?.player_id
                      )
                    }
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
