import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
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

export const Layout = ({}: IDuoCardPros): JSX.Element => {
  const [duos, setDuos] = useState<IDuoCardPros[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  useEffect(() => {
    fetch(`http://127.0.0.1:3333/games/${game.id}/ads`)
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
              onConnect={() => {}}
            />
          )}
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
};
