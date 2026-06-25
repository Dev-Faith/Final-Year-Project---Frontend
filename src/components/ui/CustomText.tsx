import { Text, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
  bold?: boolean;
}

export default function CustomText({ style, bold, ...props }: CustomTextProps) {
  return (
    <Text
      style={[
        style,
        { fontFamily: bold ? "artkinson-bold" : "artkinson-regular" },
      ]}
      {...props}
    />
  );
}
