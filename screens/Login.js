import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { auth } from "../firebase/FirebaseConnection";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          navigation.navigate("App");
        }
      });

      return unsubscribe;
    }, []);

    const handleLogin = () => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          alert("Logado com " + user.email);
          navigation.navigate("App");
        })
        .catch(error => alert(error.message));
    }

    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Criar Conta
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={() => navigation.navigate("Register")}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CRIAR CONTA
                        </Text>
                      </Button>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Ou fazer login
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}     
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}     
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton}
                      onPress={handleLogin}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          LOGIN
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});
