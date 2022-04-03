import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { COLORS, FONTS, SIZES } from "~constants";

export const splashStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    width: wp("26.4%"),
    height: wp("26.4%"),
    borderRadius: wp("26.4%") / 2,

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
  logoAndTextWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  waveImageWrapper: {
    width: "100%",
    height: 260,

    justifyContent: "flex-end",
    alignItems: "center",
  },
  textBestChoice: {
    ...FONTS.regular_14,
    color: COLORS.white,
    marginBottom: SIZES.spacing_32_horizontal,
  },
});
