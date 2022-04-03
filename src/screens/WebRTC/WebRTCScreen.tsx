import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EventOnAddStream,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from "react-native-webrtc";
import { Button, GettingCall, Video } from "~components";
import StreamService from "~services/streamService";

const configuration = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };

function WebRTCScreen() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [gettingCall, setGettingCall] = useState(false);
  const pc = useRef<RTCPeerConnection>();
  const connecting = useRef(false);

  useEffect(() => {
    const cRef = firestore().collection("meet").doc("chatId");
    const subscribe = cRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      // On answer start the call
      if (pc.current && !pc.current.remoteDescription && data && data.answer) {
        pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
      // if there is offer for chatId set the getting call flag
      if (data && data.offer && !connecting.current) {
        setGettingCall(true);
      }
    });
    // On delete of collection call hangup
    // The other side has  clicked on hangup
    const subscribeDelete = cRef.collection("callee").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "removed") {
          await hangup();
        }
      });
    });
    const subscribeCallerDelete = cRef.collection("caller").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "removed") {
          await hangup();
        }
      });
    });
    return () => {
      subscribe();
      subscribeDelete();
      subscribeCallerDelete();
    };
  }, []);

  const setupWebRTC = async () => {
    pc.current = new RTCPeerConnection(configuration);
    const stream = await StreamService.getStream();
    console.log("stream: ", stream);
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
    console.log("calling");
    connecting.current = true;
    await setupWebRTC();

    // document for the call;
    const cRef = firestore().collection("meet").doc("chatId");

    // Exchange the ICE candidates between the caller and callee
    collectIceCandidates(cRef, "caller", "callee");

    if (pc.current) {
      // create the offer for the call
      // store the offer under the document
      const offer = await pc.current.createOffer();
      pc.current.setLocalDescription(offer);

      const cWithOffer = {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      };
      cRef.set(cWithOffer);
    }
  };

  const join = async () => {
    console.log("Joining the call");
    connecting.current = true;
    setGettingCall(false);

    const cRef = firestore().collection("meet").doc("chatId");
    const offer = (await cRef.get()).data()?.offer;

    if (offer) {
      // Setup Webrtc:
      await setupWebRTC();
      // Exchange the ICE candidates:
      // Check the parameters, its reversed. Since the joining part is called
      collectIceCandidates(cRef, "callee", "caller");
      if (pc.current) {
        pc.current.setRemoteDescription(new RTCSessionDescription(offer));

        // Create the answer for the call
        // Update the document with answer
        const answer = await pc.current.createAnswer();
        pc.current.setLocalDescription(answer);
        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        cRef.update(cWithAnswer);
      }
    }
  };

  /**
   * For disconnection the call close the connection, release the stream
   * And delete the document for the call
   */
  const hangup = async () => {
    setGettingCall(false);
    connecting.current = false;
    await streamCleanUp();
    await firestoreCleanUp();
    if (pc.current) {
      pc.current.close();
    }
  };

  const streamCleanUp = async () => {
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  };
  const firestoreCleanUp = async () => {
    const cRef = firestore().collection("meet").doc("chatId");
    if (cRef) {
      const calleeCandidate = await cRef.collection("callee").get();
      calleeCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      const callerCandidate = await cRef.collection("caller").get();
      callerCandidate.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      cRef.delete();
    }
  };

  const collectIceCandidates = async (
    cRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    localName: string,
    remoteName: string
  ) => {
    if (pc.current) {
      pc.current.onicecandidate = (event) => {
        const candidateCollection = cRef.collection(localName);
        if (event.candidate) {
          candidateCollection.add(event.candidate);
        }
      };
    }

    // Get the ICE candidate added to firestore and update the local PC:
    cRef.collection(remoteName).onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change: any) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current?.addIceCandidate(candidate);
        }
      });
    });
  };

  // Display the gettingCall component
  if (gettingCall) {
    return <GettingCall hangup={hangup} join={join} />;
  }

  // Displays local stream on calling
  // Displays both local and remote stream once c all is connected
  if (localStream) {
    return <Video hangup={hangup} localStream={localStream} remoteStream={remoteStream} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button iconName="video" backgroundColor="gray" onPress={create} />
    </SafeAreaView>
  );
}

export default WebRTCScreen;

const styles = StyleSheet.create({});
