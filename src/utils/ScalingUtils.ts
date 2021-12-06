import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = Platform.OS === 'ios' ? 375 : 360;
const guidelineBaseHeight = Platform.OS === 'ios' ? 667 : 640;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const heightScale = (size: number) => (height / guidelineBaseHeight) * size;
const fontSizeScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {scale, heightScale, fontSizeScale};
