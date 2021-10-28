import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const COLORS = {
  black: '#1E1F20',
  white: '#FFFFFF',
  gray: '#6A6A6A',
  blue: '#0682FE',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
  bottomNavSpace: getBottomSpace(),
};
export const FONTS = {
  h1: {fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

// constance for bottom tab

export const BOTTOM_TAB_HEIGHT = 50 + SIZES.bottomNavSpace; // area pink
export const ITEM_TAB_HEIGHT = 50; // heigh of each item tab
export const translateY = 25;
export const TAB_CONTAINER_HEIGHT = BOTTOM_TAB_HEIGHT + 10 + translateY;
export const SPACE_BOTTOM_AREA = ITEM_TAB_HEIGHT + 10 + translateY;
const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
