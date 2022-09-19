import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { Entypo } from "@expo/vector-icons";
import logoImg from "../../assets/logo-nlw-esports.png";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../../components/Heading";
import { useCallback, useEffect, useState } from "react";
import { DuoCard } from "./components/DuoCard";
import { IDuoCardPros } from "./components/DuoCard/types";
import { DuoMatch } from "./components/DuoMatch";

export const Layout = ({}: IDuoCardPros): JSX.Element => {
  const [duos, setDuos] = useState<IDuoCardPros[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  async function getDiscordUser(adsId: string) {
    fetch(`http://localhost:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordDuoSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://localhost:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  const handleGoback = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoback}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          resizeMode="cover"
          style={styles.gameImage}
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList
          data={duos}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              id={item.id}
              name={item.name}
              weekDays={item.weekDays}
              yearsPlaying={item.yearsPlaying}
              hourStart={item.hourStart}
              hourEnd={item.hourEnd}
              useVoiceChannel={item.useVoiceChannel}
              onConnect={() => {
                getDiscordUser(item.id);
              }}
            />
          )}
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
      <DuoMatch
        closeIcon={() => setDiscordDuoSelected("")}
        visible={discordDuoSelected.length > 0}
        discord={discordDuoSelected}
      />
    </Background>
  );
};
