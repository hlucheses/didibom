import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { getUserInfo } from "../firebase/Database";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { Modal } from 'react-native'
import CameraPhotoPerfil from "../components/Camera";
import { useNavigation } from "@react-navigation/native";


const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

export default function Perfil() {
  const [openModal, setOpenModal] = useState(false);
  const { navigation } = useNavigation();

  const [DATA, setData] = useState(null);

  const getElements = async () => {
    try {
      const info = await getUserInfo();
      setData(info);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useEffect(() => {
    getElements();
  }, []);

  return (
    <Block flex style={styles.perfil}>
      <Block flex>
        <ImageBackground
          source={Images.PerfilBackground}
          style={styles.perfilContainer}
          imageStyle={styles.perfilBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: '25%' }}
          >
            <Block flex style={styles.perfilCard}>
              <Block middle style={styles.avatarContainer}>
                {(<FlatList
                  data={DATA}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item.imgUrl }}
                      style={styles.avatar}
                    />
                  )}
                />)}

                <TouchableOpacity onPress={() => {
                  setOpenModal(true);
                }}>
                  {openModal &&
                    <Modal
                      animationType="slide"
                      transparent={false}
                      visible={openModal}
                    >
                      <Text>Um simples texto</Text>
                      <TouchableOpacity onPress={() => {

                      }}><Text>GALERIA</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        navigation.navigate("Camera");
                      }}><Text>CÂMERA</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        setOpenModal(false);
                      }}><Text>VOLTAR</Text></TouchableOpacity>
                    </Modal>
                  }
                </TouchableOpacity>
              </Block>
              <Block style={styles.info}>
                <Block
                  middle
                  row
                  space="evenly"
                  style={{ marginTop: 20, paddingBottom: 24 }}
                >
                
                  <Button
                    small
                    style={{ backgroundColor: argonTheme.COLORS.PRIMARY }}
                  >
                    CONECTAR
                  </Button>
                  <Button
                    small
                    style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                  >
                    MENSAGEM
                  </Button>
                </Block>
                <Block row space="between">
                  <Block middle>
                    <Text
                      bold
                      size={18}
                      color="#525F7F"
                      style={{ marginBottom: 4 }}
                    >
                      0
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>Conexões</Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      6
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>Fotos</Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      0
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>Comentários</Text>
                  </Block>
                </Block>
              </Block>
              <Block flex>
                <Block middle style={styles.nameInfo}>
                  {(<FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                      <Text bold size={28} color="#32325D">
                        {item.name}
                      </Text>
                    )}
                  />)}

                  <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    Luanda, Angola
                  </Text>
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block middle>
                  <Text
                    size={16}
                    color="#525F7F"
                    style={{ textAlign: "center" }}
                  >
                    Amo Comida
                  </Text>

                </Block>
                <Block
                  row
                  space="between"
                >
                  <Text bold size={16} color="#525F7F" style={{ marginTop: 12 }}>
                    Album
                  </Text>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Block row space="between" style={{ flexWrap: "wrap" }}>
                    {Images.Viewed.map((img, imgIndex) => (
                      <Image
                        source={{ uri: img }}
                        key={`viewed-${img}`}
                        resizeMode="cover"
                        style={styles.thumb}
                      />
                    ))}
                  </Block>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  perfil: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  perfilContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  perfilBackground: {
    width: width,
    height: height / 2
  },
  perfilCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});