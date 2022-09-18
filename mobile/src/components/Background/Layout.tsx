import { ImageBackground } from "react-native";
import backGroundImage from "../../assets/background-galaxy.png";
import { styles } from "./styles";
import { props } from "./types";

export const Layout = ({ children }: props): JSX.Element => {
  return (
    <ImageBackground
      source={backGroundImage}
      defaultSource={backGroundImage}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
};
