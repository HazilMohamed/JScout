/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

import config from "../config";
import { TeamType } from "../types/types";

import "../styles/styles.scss";

const ControllerComponent: React.FC = () => {
  const api = config.api;
  const [teams, setTeams] = useState<Array<TeamType>>();
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();

  const fetchLineUp = () => {
    axios.post(api + "/match/teams").then((res) => {
      const data = JSON.parse(res.data[0]);
      const fetched: Array<TeamType> = Object.values(data);
      setTeams(fetched);
      setSelectedTeam(fetched[0]);
    });
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
              <select name="team" id="team">
                {teams.map((team: TeamType) => (
                  <option key={team.team_id} value={team.team_id}>
                    {team.team_name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="option">
            <input type="button" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ControllerComponent;
