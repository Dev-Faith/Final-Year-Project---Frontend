import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
} from "react-native";
import CustomText from "./CustomText";

interface CustomButtonProps extends Omit<PressableProps, "style"> {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  isloading?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export const CustomButton = ({
  title,
  variant = "primary",
  isloading = false,
  style,
  ...props
}: CustomButtonProps) => {
  const getBackgroundColor = (pressed: boolean): ViewStyle => {
    if (variant === "primary")
      return { backgroundColor: pressed ? "#1E40Af" : "#2563EB" };
    if (variant === "secondary") return { backgroundColor: "#94A3B8" };
    if (variant === "outline")
      return { borderColor: "#2563EB", borderWidth: 2 };
    if (variant === "text") return {};
    return {};
  };

  const getTextColor = () => {
    if (variant === "primary") return "#FFFFFF";
    if (variant === "secondary") return "#FFFFFF";
    if (variant === "outline") return "#2563EB";
    if (variant === "text") return "#2563EB";
    return "#FFFFFF";
  };

  return (
    <Pressable
      disabled={props.disabled || isloading}
      style={({ pressed }) => [
        getBackgroundColor(pressed),
        ...(Array.isArray(style) ? style : [style]),
        styles.button,
      ]}
      {...props}
    >
      {({ pressed }) =>
        isloading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <CustomText
            style={[
              styles.text,
              { color: getTextColor() },
              pressed && { opacity: 0.8 },
            ]}
          >
            {title}
          </CustomText>
        )
      }
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 64,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
  },
});
