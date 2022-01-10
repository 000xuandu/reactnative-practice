import React, {useRef, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import { EventOnAddStream, MediaStream, RTCPeerConnection } from 'react-native-webrtc';
import {Button, GettingCall, Video} from '~components';
import {COLORS} from '~constants';
import StreamService from '~services/streamService';
import firestore from '@react-native-firebase/firestore';

const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};

const WebRTCScreen = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [gettingCall, setGettingCall] = useState(false);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);

  const setupWebRTC = async () => {
    pc.current = new RTCPeerConnection(configuration);
    const stream = await StreamService.getStream();
    if (stream) {
      setLocalStream(stream);
      pc.current.addStream(stream);
    }

    // Get the remote stream once it is available
    pc.current.onaddstream = (event: EventOnAddStream) => {
      setRemoteStream(event.stream);
    };
  };

  const create = async () => {
    console.log('calling');
    connecting.current = true;
    await setupWebRTC();

    // document for the call;
    const cRef = firestore().collection('meet').doc('chatId');

    // Exchange the ICE candidates between the caller and callee
  };
  const join = async () => {};
  const hangup = async () => {};

  // Display the gettingCall component
  if (gettingCall) {
    return <GettingCall hangup={hangup} join={join} />;
  }

  // Displays local stream on calling
  // Displays both local and remote stream once c all is connected
  if (localStream) {
    return (
      <Video
        hangup={hangup}
        localStream={localStream}
        remoteStream={remoteStream}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button iconName="video" backgroundColor="gray" onPress={create} />
    </SafeAreaView>
  );
};

export default WebRTCScreen;

const styles = StyleSheet.create({});
