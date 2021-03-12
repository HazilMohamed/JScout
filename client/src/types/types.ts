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
  pass_body_part_name?: string;
  pass_outcome_name?: string;
  pass_recipient_name?: string;
  play_pattern_name?: string;
} & BasicDetailsTypes;
