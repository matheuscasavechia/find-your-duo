import { View, Image, FlatList } from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";
import { GAMES } from "../../utils/games";

export const Layout = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logoContainer} />

      <Heading
        title="Encontre seu duo"
        subtitle="Selecione o game que deseja jogar..."
      />
      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        contentContainerStyle={styles.contentList}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
