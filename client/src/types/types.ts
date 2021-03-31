export type BasicDetailsTypes = {
  id: string;
  index: number;
  team_name: string;
  player_name: string;
  position_name: string;
  timestamp: string;
  period: number;
  type_name: string;
  location: Array<number>;
};

export type PassDetailsTypes = {
  pass_end_location: Array<number>;
  pass_angle: number;
  duration: number;
  pass_length: number;
  pass_height_id: number;
  pass_body_part_id?: number;
  pass_outcome_name?: string;
  pass_recipient_name?: string;
  play_pattern_id?: number;
} & BasicDetailsTypes;

export type CountryType = {
  id: number;
  name: string;
};

export type PlayerType = {
  player_id: number;
  player_name: string;
  country: CountryType;
  jersey_number?: number;
  player_nickname?: string;
};

export type TeamType = {
  team_id: number;
  team_name: string;
  lineup: Array<PlayerType>;
};

export type CompetitionType = {
  competition_id: number;
  competition_name: string;
};

export type SeasonType = {
  season_id: number;
  season_name: string;
} & CompetitionType;

export type MatchType = {
  match_id: number;
  home_team_home_team_name: string;
  away_team_away_team_name: string;
};
