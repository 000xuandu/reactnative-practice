import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { MediaStream, RTCView } from "react-native-webrtc";
import { Button } from "~components";

interface Props {
  hangup: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

const ButtonContainer: FC<Props> = ({ hangup }) => (
  <View style={{ marginBottom: 30 }}>
    <Button iconName="phone" backgroundColor="red" onPress={hangup} />
  </View>
);

const Video: FC<Props> = ({ hangup, localStream, remoteStream }) => {
  // On call ưe will just display the local stream
  if (localStream && !remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={localStream.toURL()} objectFit="cover" style={styles.video} />
        <ButtonContainer hangup={hangup} />
      </View>
    );
  }
  // Once the call is connected we will display
  // local stream on top of remote stream
  if (localStream && remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView streamURL={remoteStream.toURL()} objectFit="cover" style={styles.video} />
        <RTCView streamURL={localStream.toURL()} objectFit="cover" style={styles.videoLocal} />
        <ButtonContainer hangup={hangup} />
      </View>
    );
  }
  return <ButtonContainer hangup={hangup} />;
};

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  videoLocal: {
    position: "absolute",
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 10,
  },
});
