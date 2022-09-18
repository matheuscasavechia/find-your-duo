import { TouchableOpacity, View } from "react-native";
import { THEME } from "../../../../theme";
import { DuoCardLabel } from "../DuoCardLabel";

import { styles } from "./styles";
import { IDuoCardPros } from "./types";

export const Layout = ({
  name,
  weekDays,
  yearsPlaying,
  hourStart,
  hourEnd,
  useVoiceChannel,
}: IDuoCardPros): JSX.Element => {
  return (
    <View style={styles.container}>
      <DuoCardLabel label="Nome" value={name} />
      <DuoCardLabel label="Tempo de Jog" value={`${yearsPlaying} ano(s)`} />
      <DuoCardLabel
        label="Disponibilidade"
        value={`${weekDays.length} dias \u2022 ${hourStart} - ${hourEnd}`}
      />
      <DuoCardLabel
        label="Chamada de áudio?"
        value={useVoiceChannel ? "Sim" : "Não"}
        colorValue={useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      {/* <TouchableOpacity style={styled.button}></TouchableOpacity> */}
    </View>
  );
};
