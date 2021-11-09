import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const heightScale = (size: number) => (height / guidelineBaseHeight) * size;
const fontSizeScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export {scale, heightScale, fontSizeScale};
