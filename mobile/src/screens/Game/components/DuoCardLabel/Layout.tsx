import { Text, View } from "react-native";
import { THEME } from "../../../../theme";

import { styles } from "./styles";
import { IDuoCardLabel } from "./types";

export const Layout = ({
  label,
  value,
  colorValue = THEME.COLORS.TEXT,
}: IDuoCardLabel): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: colorValue }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};
