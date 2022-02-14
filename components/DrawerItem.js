import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import argonTheme from "../constants/Theme";
import { auth } from "../firebase/FirebaseConnection";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="shop"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.BLACK}
          />
        );/*
      case "Elements":
        return (
          <Icon
            name="map-big"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.ERROR}
          />
        );*/
      /*
    case "Articles":
      return (
        <Icon
          name="spaceship"
          family="ArgonExtra"
          size={14}
          color={focused ? "white" : argonTheme.COLORS.PRIMARY}
        />
      );
      */
      case "Perfil":
        return (
          <Icon
            name="chart-pie-35"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.BLACK}
          />
        );
      case "Conta":
        return (
          <Icon
            name="calendar-date"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.BLACK}
          />
        );
      case "Logout":
        return <Icon
          name="logout"
          family="FontAwesomeExtra"
          size={14}
          color={focused ? "white" : argonTheme.COLORS.BLACK}
        />;
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() => {
            if (title != "Logout") {
              title == navigation.navigate(title);
            } else {
              auth
                .signOut()
                .then(() => {
                  alert("Está a terminar a sessão!");
                  navigation.replace("Login");
                })
                .catch(error => alert(error.message));
            }
          }
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={focused ? true : false}
              color={focused ? "white" : "rgba(0,0,0,0.5)"}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
