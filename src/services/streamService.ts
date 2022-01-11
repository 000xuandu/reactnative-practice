import {mediaDevices} from 'react-native-webrtc';

export default class StreamService {
  static async getStream() {
    let isFront = true;
    const sourceInfos = await mediaDevices.enumerateDevices();
    console.log('sourceInfos: ', sourceInfos);
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (
        sourceInfo.kind == 'videoinput' &&
        sourceInfo.facing == (isFront ? 'front' : 'environment')
      ) {
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
        optional: [{sourceId: videoSourceId}],
        facingMode: isFront ? 'user' : 'environment',
      },
    });
    if (typeof stream !== 'boolean') return stream;
    return null;
  }
}
