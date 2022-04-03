import React from "react";
import { StatusBar, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { CustomIcon } from "~components";
import { COLORS, FONTS, SIZES } from "~constants";

interface TopBarProps {
  customContainerStyle?: StyleProp<ViewStyle>;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIconName?: string;
  rightIconName?: string;
  leftTitle?: string;
  headerText: string;
  [key: string]: any;
}

const defaultProps: TopBarProps = {
  leftIconName: "Left",
  showLeftIcon: true,
  showRightIcon: false,
  headerText: "HeaderText",
};

const TopBar: React.FC<TopBarProps> = ({
  customContainerStyle,
  leftIconName,
  showLeftIcon,
  showRightIcon,
  rightIconName,
  leftTitle,
  headerText,
}) => (
  <View style={[styles.container, customContainerStyle]}>
    <StatusBar barStyle="light-content" />
    <View style={[styles.contentWrapper]}>
      <TouchableOpacity>
        {!leftTitle && showLeftIcon && leftIconName && (
          <View style={styles.iconBtn}>
            <CustomIcon name={leftIconName} size={SIZES.spacing_24_horizontal} color={COLORS.white} />
          </View>
        )}
        {leftTitle && <Text style={styles.leftText}>{leftTitle}</Text>}
      </TouchableOpacity>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      <TouchableOpacity>
        <View style={styles.iconBtn}>
          {showRightIcon && rightIconName && (
            <CustomIcon name={rightIconName} size={SIZES.spacing_24_horizontal} color={COLORS.white} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: SIZES.statusBarSpace,
  },
  contentWrapper: {
    height: heightPercentageToDP("6.9%"),
    paddingHorizontal: SIZES.spacing_12_horizontal,

    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    height: "100%",
    width: SIZES.spacing_12_horizontal * 2 + SIZES.spacing_24_horizontal,

    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    ...FONTS.medium_16,
    color: COLORS.black,
  },
  headerWrapper: {
    flex: 1,
    marginHorizontal: SIZES.spacing_8_horizontal,
    justifyContent: "center",
    alignItems: "center",
  },
  leftText: {
    ...FONTS.medium_16,
    color: COLORS.black,
    paddingLeft: SIZES.spacing_12_horizontal,
  },
});
TopBar.defaultProps = defaultProps;
export default TopBar;
