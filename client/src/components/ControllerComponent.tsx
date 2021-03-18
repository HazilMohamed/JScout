/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

import config from "../config";
import { TeamType, PlayerType } from "../types/types";

import "../styles/styles.scss";

const ControllerComponent: React.FC = () => {
  const api = config.api;
  const [teams, setTeams] = useState<Array<TeamType>>();
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType>();

  const fetchLineUp = () => {
    axios.post(api + "/match/teams").then((res) => {
      const data = JSON.parse(res.data[0]);
      const fetched: Array<TeamType> = Object.values(data);
      setTeams(fetched);
      setSelectedTeam(fetched[0]);
      setSelectedPlayer(selectedTeam?.lineup[0]);
    });
  };

  const changeTeam = (id: string) => {
    const team = teams?.find((x) => x.team_id === Number(id));
    setSelectedTeam(team);
  };

  const changePlayer = (id: string) => {
    const player = selectedTeam?.lineup.find((x) => x.player_id === Number(id));
    setSelectedPlayer(player);
  };

  useEffect(() => {
    fetchLineUp();
  }, []);

  return (
    <div className="controller">
      <h1>JScout</h1>
      <div className="select-form">
        <form>
          {teams && (
            <div className="option">
              <label className="select-label">Team</label>
              <select
                name="team"
                id="team"
                value={selectedTeam?.team_id}
                onChange={(ev) => changeTeam(ev.target.value)}
                className="select-options"
              >
                {teams.map((team: TeamType) => (
                  <option key={team.team_id} value={team.team_id}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedTeam && (
            <div className="option">
              <label className="select-label">Player</label>
              <select
                name="players"
                id="players"
                className="select-options"
                value={selectedPlayer?.player_id}
                onChange={(ev) => changePlayer(ev.target.value)}
              >
                {selectedTeam.lineup.map((player) => (
                  <option key={player.player_id} value={player.player_id}>
                    {player.player_name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-button">
            <input type="button" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ControllerComponent;
