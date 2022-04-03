import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { COLORS, FONTS, SIZES } from "~constants";

export const otpStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  customHeader: {
    backgroundColor: COLORS.primary.blue,
  },
  content: {
    flex: 1,
    paddingTop: SIZES.spacing_16_vertical,
    backgroundColor: COLORS.primary.blue,
  },
  iconLockAndTextWrapper: {
    alignItems: "center",
    marginBottom: SIZES.spacing_32_vertical * 2,
  },
  iconLock: {
    width: heightPercentageToDP("9.85%"),
    height: heightPercentageToDP("9.85%"),
    borderRadius: heightPercentageToDP("9.85%") / 2,

    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: heightPercentageToDP("9.85%") / 2,
  },
  enterOtpCode: {
    ...FONTS.medium_20,
    color: COLORS.white,
    marginBottom: SIZES.spacing_2_vertical,
  },
  sentOtpCode: {
    ...FONTS.regular_14,
    color: COLORS.white,
    opacity: 0.7,
    marginBottom: SIZES.spacing_4_vertical,
  },
  phone: {
    ...FONTS.bold_16,
    color: COLORS.white,
  },
});
