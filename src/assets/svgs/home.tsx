import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface SVGTypes {
  fill?: string;
  xmlns?: string;
  className?: string;
}

function HomeSvg(props: SVGTypes) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-activity"
      {...props}
    >
      <Path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </Svg>
  );
}

export default HomeSvg;
