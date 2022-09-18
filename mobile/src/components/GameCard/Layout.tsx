import { View, TouchableOpacity, ImageBackground, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { Props } from "./types";
import { THEME } from "../../theme";

export const Layout = ({ data, ...rest }: Props): JSX.Element => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={data.cover}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.ads}>{data.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
