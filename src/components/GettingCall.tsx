import React, { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button } from "~components";
import { images } from "~constants";

interface Props {
  hangup: () => void;
  join: () => void;
}

const GettingCall: FC<Props> = ({ hangup, join }) => (
  <View style={styles.container}>
    <Image source={images.onboarding1} style={styles.image} />
    <View style={styles.bContainer}>
      <Button
        iconName="phone"
        backgroundColor="green"
        onPress={join}
        style={{
          marginRight: 30,
        }}
      />
      <Button
        iconName="phone"
        backgroundColor="red"
        onPress={hangup}
        style={{
          marginLeft: 30,
        }}
      />
    </View>
  </View>
);

export default GettingCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
});
