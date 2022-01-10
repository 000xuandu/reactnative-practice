import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MediaStream, RTCView} from 'react-native-webrtc';
import {Button} from '~components';

interface Props {
  hangup: () => void;
  localStream?: MediaStream | null;
  remoteStream?: MediaStream | null;
}

const ButtonContainer: FC<Props> = ({hangup}) => {
  return (
    <View style={{}}>
      <Button iconName="phone" backgroundColor="read" onPress={hangup} />
    </View>
  );
};

const Video: FC<Props> = ({hangup, localStream, remoteStream}) => {
  // On call ưe will just display the local stream
  if (localStream && !remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={localStream.toURL()}
          objectFit="cover"
          style={styles.video}
        />
      </View>
    );
  }
  // Once the call is connected we will display
  // local stream on top of remote stream
  if (localStream && remoteStream) {
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={remoteStream.toURL()}
          objectFit="cover"
          style={styles.video}
        />
        <RTCView
          streamURL={localStream.toURL()}
          objectFit="cover"
          style={styles.videoLocal}
        />
      </View>
    );
  }
  return <ButtonContainer hangup={hangup} />;
};

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoLocal: {
    position: 'absolute',
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 10,
  },
});
