import { Image, FlatList } from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { GameCardProps } from "../../components/GameCard/types";
import { styles } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

//TODO! mover toda a logica de controller para ao controller da home
export const Layout = (): JSX.Element => {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  const handleOpenGame = useCallback(
    ({ id, title, bannerUrl }: GameCardProps) => {
      navigation.navigate("game", { id, title, bannerUrl });
    },
    []
  );

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logoContainer} />

        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => {
                handleOpenGame(item);
              }}
            />
          )}
          contentContainerStyle={styles.contentList}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  );
};
