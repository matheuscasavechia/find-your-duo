import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import { styles } from "./styles";
import { THEME } from "../../../../theme";
import { Heading } from "../../../../components/Heading";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

//TODO! tirar tipagem da tela e todos os controller da mesma para um arquivo a parte

interface Props extends ModalProps {
  discord: string;
  closeIcon: () => void;
}
export const Layout = ({ discord, closeIcon, ...rest }: Props): JSX.Element => {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert(
      "Discord Copiado!",
      "Usuário copiado para você colocar no Discord."
    );
    setIsCopping(false);
  }

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            title="Let's play!"
            subtitle="Agora é só começar a jogar!"
            style={{
              alignItems: "center",
              marginTop: 24,
            }}
          />
          <Text style={styles.label}>Adicione no Discord</Text>
          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};