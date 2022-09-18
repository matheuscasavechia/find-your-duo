import { ImageSourcePropType, TouchableOpacityProps } from "react-native";

export interface GameCardProps {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType;
}

export interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}
