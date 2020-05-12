import { responsiveWidth } from "react-native-responsive-dimensions";

type Dimensions = {
  height: number,
  width: number,
};

type PostDimensionsType = {
  Small: Dimensions,
  Medium: Dimensions,
  Large: Dimensions,
};

type PollIntervalsType = {
  messages: number,
  profile: number,
  profileView: number,
  postView: number,
  interaction: number,
  notification: number,
  lastSeen: number,
  blockList: number,
};

export const PostDimensions: PostDimensionsType = {
  Small: { height: responsiveWidth(28.5), width: responsiveWidth(28.5) },
  Medium: { height: responsiveWidth(43), width: responsiveWidth(43) },
  Large: { height: responsiveWidth(90), width: responsiveWidth(90) },
};

export const PollIntervals: PollIntervalsType = {
  messages: 2 * 1000,
  profile: 1000,
  profileView: 1000,
  postView: 2 * 1000,
  interaction: 1000,
  notification: 2 * 1000,
  lastSeen: 10 * 1000,
  blockList: 1000,
};
