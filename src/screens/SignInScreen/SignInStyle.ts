import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS, FONTS, SIZES } from "~constants";

export const signInStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoAndTextWrapper: {
    height: hp("40%"),
    width: "100%",
    backgroundColor: COLORS.primary.blue,

    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    width: wp("25.4%"),
    height: wp("25.4%"),
    borderRadius: wp("25.4%") / 2,

    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "60%",
    height: "60%",
  },
  textLogoWrapper: {
    marginTop: SIZES.spacing_24_vertical,
  },
  textLogoApp: {
    ...FONTS.sbold_32,
    color: COLORS.white,
  },
  waveImageWrapper: {
    width: "100%",
    height: hp("32.01%"),

    position: "absolute",
    bottom: -80,
  },
  signInFormWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    paddingTop: SIZES.spacing_24_vertical,
    paddingBottom: SIZES.bottomNavSpace,

    borderTopLeftRadius: SIZES.spacing_16_vertical,
    borderTopRightRadius: SIZES.spacing_16_vertical,

    transform: [{ translateY: hp("38%") }],
  },
  signInTitle: {
    ...FONTS.bold_24,
    color: COLORS.black,

    marginHorizontal: SIZES.spacing_24_vertical,
    marginBottom: SIZES.spacing_24_vertical,
  },
  inputStyle: {
    marginBottom: SIZES.spacing_16_vertical,
  },
  signInBtn: {
    height: hp("6.89%"),
    backgroundColor: COLORS.primary.orange,

    borderRadius: SIZES.spacing_8_horizontal,
    marginHorizontal: SIZES.spacing_24_horizontal,
    marginBottom: SIZES.spacing_24_vertical,

    justifyContent: "center",
    alignItems: "center",
  },
  signInTextBtn: {
    ...FONTS.sbold_16,
    color: COLORS.white,
  },
  forgotPassWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  forgetPassText: {
    ...FONTS.sbold_14,
    color: COLORS.primary.orange,
    textAlign: "center",
  },
  signUpWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("5.54"),
  },
  dontHaveAccYet: {
    ...FONTS.regular_12,
    color: COLORS.secondary.gray_2,
  },
  signUpText: {
    ...FONTS.sbold_14,
    color: COLORS.primary.orange,
    marginHorizontal: SIZES.spacing_4_horizontal,
  },
});
