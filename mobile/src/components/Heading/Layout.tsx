import { View, Text } from "react-native";

import { styles } from "./styles";
import { Props } from "./types";

export const Layout = ({ title, subtitle, ...rest }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};
