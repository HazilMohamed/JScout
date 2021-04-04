/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

import config from "../config";
import {
  CompetitionType,
  SeasonType,
  MatchType,
  TeamType,
  PlayerType,
  PassDetailsTypes,
} from "../types/types";
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
  competition?: CompetitionType | undefined;
  season?: SeasonType | undefined;
  match?: MatchType | undefined;
  team?: TeamType | undefined;
  player?: PlayerType | undefined;
}

const initialSelectedOptions: SelectedOptions = {
  competition: undefined,
  season: undefined,
  match: undefined,
  team: undefined,
  player: undefined,
};

const ControllerComponent: React.FC<{
  handleSubmit: Function;
  passData?: PassDetailsTypes;
}> = ({ handleSubmit, passData }) => {
  const api = config.api;
  const styles = useStyles();
  const [competitions, setCompetitions] = useState<Array<CompetitionType>>();
  const [seasons, setSeasons] = useState<Array<SeasonType>>();
  const [matches, setMatches] = useState<Array<MatchType>>();
  const [teams, setTeams] = useState<Array<TeamType>>();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    initialSelectedOptions
  );

  const fetchCompetitions = () => {
    axios.post(api + "/match/competitions").then((res) => {
      if (res.data && res.data.success) {
        const data = JSON.parse(res.data.data[0]);
        const fetched: Array<CompetitionType> = Object.values(data);
        setCompetitions(fetched);
      } else {
        console.log(res.data.message);
      }
    });
  };

  const fetchSeasons = () => {
    axios
      .post(api + "/match/seasons", {
        compId: selectedOptions?.competition?.competition_id,
      })
      .then((res) => {
        if (res.data && res.data.success) {
          const data = JSON.parse(res.data.data[0]);
          const fetched: Array<SeasonType> = Object.values(data);
          setSeasons(fetched);
        } else {
          console.log(res.data.message);
        }
      });
  };

  const fetchMatches = () => {
    axios
      .post(api + "/match/matches", {
        compId: selectedOptions?.competition?.competition_id,
        seasonId: selectedOptions?.season?.season_id,
      })
      .then((res) => {
        if (res.data && res.data.success) {
          const data = JSON.parse(res.data.data[0]);
          const fetched: Array<MatchType> = Object.values(data);
          setMatches(fetched);
        } else {
          console.log(res.data.message);
        }
      });
  };

  const fetchLineUp = () => {
    axios
      .post(api + "/match/lineups", {
        matchId: selectedOptions?.match?.match_id,
      })
      .then((res) => {
        if (res.data && res.data.success) {
          const data = JSON.parse(res.data.data[0]);
          const fetched: Array<TeamType> = Object.values(data);
          setTeams(fetched);
        } else {
          console.log(res.data.message);
        }
      });
  };

  const changeOptions = (name: any, value: string | unknown) => {
    let newValue;

    if (name === "competition") {
      newValue = competitions?.find((x) => x.competition_id === Number(value));
      setSelectedOptions({ ...initialSelectedOptions, competition: newValue });
    } else if (name === "season") {
      newValue = seasons?.find((x) => x.season_id === Number(value));
      setSelectedOptions({
        ...initialSelectedOptions,
        competition: selectedOptions.competition,
        season: newValue,
      });
    } else if (name === "match") {
      newValue = matches?.find((x) => x.match_id === Number(value));
      setSelectedOptions({
        ...initialSelectedOptions,
        competition: selectedOptions.competition,
        season: selectedOptions.season,
        match: newValue,
      });
    } else if (name === "team") {
      newValue = teams?.find((x) => x.team_id === Number(value));
      setSelectedOptions({
        ...initialSelectedOptions,
        competition: selectedOptions.competition,
        season: selectedOptions.season,
        match: selectedOptions.match,
        team: newValue,
      });
    } else if (name === "player") {
      newValue = selectedOptions?.team?.lineup.find(
        (x) => x.player_id === value
      );
      setSelectedOptions({
        ...initialSelectedOptions,
        competition: selectedOptions.competition,
        season: selectedOptions.season,
        match: selectedOptions.match,
        team: selectedOptions.team,
        player: newValue,
      });
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  useEffect(() => {
    if (selectedOptions?.competition) {
      fetchSeasons();
    }
  }, [selectedOptions?.competition]);

  useEffect(() => {
    if (selectedOptions?.season) {
      fetchMatches();
    }
  }, [selectedOptions?.season]);

  useEffect(() => {
    if (selectedOptions?.match) {
      fetchLineUp();
    }
  }, [selectedOptions?.match]);

  return (
    <Paper elevation={5} className={styles.controller}>
      <Typography className={styles.header}>JScout</Typography>
      <Grid container justify={"space-around"}>
        <Grid xs={12} item className={styles.grid}>
          <Paper
            elevation={3}
            className={styles.paperForm}
            style={{ height: passData ? "335px" : "715px" }}
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
                    value={selectedOptions?.competition?.competition_id || ""}
                    onChange={(ev) =>
                      changeOptions(ev.target.name, ev.target.value)
                    }
                    displayEmpty
                    className={styles.formText}
                  >
                    <MenuItem value="" disabled>
                      Select a Competition
                    </MenuItem>
                    {competitions.map((comp: CompetitionType) => (
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
                    value={selectedOptions.season?.season_id || ""}
                    onChange={(ev) =>
                      changeOptions(ev.target.name, ev.target.value)
                    }
                    displayEmpty
                    className={styles.formText}
                  >
                    <MenuItem value="" disabled>
                      Select a Season
                    </MenuItem>
                    {seasons.map((season: SeasonType) => (
                      <MenuItem key={season.season_id} value={season.season_id}>
                        {season.season_name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
              {selectedOptions?.season && matches && (
                <div className={styles.items}>
                  <InputLabel className={styles.formText} id="match-label">
                    Match
                  </InputLabel>
                  <Select
                    id="match"
                    name="match"
                    labelId="match-label"
                    value={selectedOptions.match?.match_id || ""}
                    onChange={(ev) =>
                      changeOptions(ev.target.name, ev.target.value)
                    }
                    displayEmpty
                    className={styles.formText}
                  >
                    <MenuItem value="" disabled>
                      Select a Match
                    </MenuItem>
                    {matches.map((match: MatchType) => (
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
                    value={selectedOptions.team?.team_id || ""}
                    onChange={(ev) =>
                      changeOptions(ev.target.name, ev.target.value)
                    }
                    displayEmpty
                    className={styles.formText}
                  >
                    <MenuItem value="" disabled>
                      Select a Team
                    </MenuItem>
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
                  <InputLabel className={styles.formText} id="player-label">
                    Player
                  </InputLabel>
                  <Select
                    id="player"
                    name="player"
                    labelId="player-label"
                    value={selectedOptions.player?.player_id || ""}
                    onChange={(ev) =>
                      changeOptions(ev.target.name, ev.target.value)
                    }
                    displayEmpty
                    className={styles.formText}
                  >
                    <MenuItem value="" disabled>
                      Select a Player
                    </MenuItem>
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
              <h3>Pass Data</h3>
              <Typography className={styles.paperContent}>
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
