import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

export const COLORS = {
  black: '#1E1F20',
  white: '#FFFFFF',
  gray: '#6A6A6A',
  blue: '#0682FE',
  // Wallet App
  primary: {
    blue: '#1F6CFF',
    orange: '#FF9900',
  },
  secondary: {
    dark_blue: '#004AD7',
    ocean_blue: '#00D1FF',
    soft_red: '#FF6854',
    purple: '#8674F5',
    red: '#FF4444',
    green: '#17D85C',
    black: '#000000',
    gray_1: '#949494',
    gray_2: '#B5B5B5',
    gray_3: '#D7D7D7',
    gray_4: '#F2F2F2',
    gray_5: '#F9F9F9',
  },
  shade: {
    blue_2: '#1F6CFF',
    light_blue: '#AECAFF',
    light_blue_2: '#E9F0FF',
    light_green: '#17D85C',
    light_orange: '#FF9900',
  },
};
export const SIZES = {
  spacing_2_vertical: hp('0.25%'),
  spacing_4_vertical: hp('0.49%'),
  spacing_8_vertical: hp('1%'),
  spacing_12_vertical: hp('1.48%'),
  spacing_16_vertical: hp('1.97%'),
  spacing_24_vertical: hp('2.95%%'),
  spacing_32_vertical: hp('3.94%'),

  spacing_2_horizontal: wp('0.53%'),
  spacing_4_horizontal: wp('1.06%'),
  spacing_8_horizontal: wp('2.13%'),
  spacing_12_horizontal: wp('3.2%'),
  spacing_16_horizontal: wp('4.27%'),
  spacing_24_horizontal: wp('6.4%'),
  spacing_32_horizontal: wp('8.53%'),

  // app dimensions
  width,
  height,
  bottomNavSpace: getBottomSpace(),
  statusBarSpace: getStatusBarHeight(true),
};
export const FONTS = {
  regular_12: {
    fontFamily: 'Inter',
    fontSize: RFValue(12),
    lineHeight: hp('2.51%'),
  },
  regular_13: {
    fontFamily: 'Inter',
    fontSize: RFValue(13),
    lineHeight: hp('2.72%'),
  },
  regular_14: {
    fontFamily: 'Inter',
    fontSize: RFValue(14),
    lineHeight: hp('2.93%'),
  },
  regular_16: {
    fontFamily: 'Inter',
    fontSize: RFValue(16),
    lineHeight: hp('3.35%'),
  },
  regular_18: {
    fontFamily: 'Inter',
    fontSize: RFValue(18),
    lineHeight: hp('3.54%'),
  },
  regular_20: {
    fontFamily: 'Inter',
    fontSize: RFValue(20),
    lineHeight: hp('3.94%'),
  },
  regular_24: {
    fontFamily: 'Inter',
    fontSize: RFValue(24),
    lineHeight: hp('4.43%'),
  },
  regular_32: {
    fontFamily: 'Inter',
    fontSize: RFValue(32),
    lineHeight: hp('5.51%'),
  },
  medium_12: {
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(12),
    lineHeight: hp('2.51%'),
  },
  medium_13: {
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(13),
    lineHeight: hp('2.72%'),
  },
  medium_14: {
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(14),
    lineHeight: hp('2.93%'),
  },
  medium_16: {
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(16),
    lineHeight: hp('3.35%'),
  },
  medium_18: {
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(18),
    lineHeight: hp('3.54%'),
  },
  medium_20: {
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(20),
    lineHeight: hp('3.94%'),
  },
  medium_24: {
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(24),
    lineHeight: hp('4.43%'),
  },
  medium_32: {
    fontFamily: 'Inter-Medium',
    fontSize: RFValue(32),
    lineHeight: hp('5.51%'),
  },
  sbold_12: {
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(12),
    lineHeight: hp('2.51%'),
  },
  sbold_13: {
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(13),
    lineHeight: hp('2.72%'),
  },
  sbold_14: {
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(14),
    lineHeight: hp('2.93%'),
  },
  sbold_16: {
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(16),
    lineHeight: hp('3.35%'),
  },
  sbold_18: {
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(18),
    lineHeight: hp('3.54%'),
  },
  sbold_20: {
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(20),
    lineHeight: hp('3.94%'),
  },
  sbold_24: {
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(24),
    lineHeight: hp('4.43%'),
  },
  sbold_32: {
    fontFamily: 'Inter-SemiBold',
    fontSize: RFValue(32),
    lineHeight: hp('5.51%'),
  },
  bold_12: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(12),
    lineHeight: hp('2.51%'),
  },
  bold_13: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(13),
    lineHeight: hp('2.72%'),
  },
  bold_14: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(14),
    lineHeight: hp('2.93%'),
  },
  bold_16: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(16),
    lineHeight: hp('3.35%'),
  },
  bold_18: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(18),
    lineHeight: hp('3.54%'),
  },
  bold_20: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(20),
    lineHeight: hp('3.94%'),
  },
  bold_24: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(24),
    lineHeight: hp('4.43%'),
  },
  bold_32: {
    fontFamily: 'Inter-Bold',
    fontSize: RFValue(32),
    lineHeight: hp('5.51%'),
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
