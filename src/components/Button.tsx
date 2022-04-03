import React, { FC } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  onPress: () => void;
  iconName: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<Props> = ({ onPress, backgroundColor, style, iconName }) => (
  <TouchableOpacity onPress={onPress} style={[{ backgroundColor }, style, styles.button]}>
    <Icon name={iconName} color="white" size={20} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 50,
    height: 50,
  },
});

export default Button;
