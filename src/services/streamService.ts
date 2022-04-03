import { mediaDevices } from "react-native-webrtc";

export default class StreamService {
  static async getStream() {
    const isFront = true;
    const sourceInfos = await mediaDevices.enumerateDevices();
    console.log("sourceInfos: ", sourceInfos);
    let videoSourceId;
    // Why we need write i+=1:
    // Pls see: https://eslint.org/docs/rules/no-plusplus#no-plusplus
    for (let i = 0; i < sourceInfos.length; i += 1) {
      const sourceInfo = sourceInfos[i];
      if (sourceInfo.kind === "videoinput" && sourceInfo.facing === (isFront ? "front" : "environment")) {
        videoSourceId = sourceInfo.deviceId;
      }
    }
    const stream = mediaDevices.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 640,
          minHeight: 480,
          minFrameRate: 30,
        },
        optional: [{ sourceId: videoSourceId }],
        facingMode: isFront ? "user" : "environment",
      },
    });
    if (typeof stream !== "boolean") return stream;
    return null;
  }
}
