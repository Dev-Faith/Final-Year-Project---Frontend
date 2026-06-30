import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

const badge = () => {
  return (
    <View style={styles.badge}>
      <CustomText style={styles.badgeText}>5</CustomText>
    </View>
  );
};

export const NotificationBtn = ({
  onPress,
  style,
}: {
  style: any;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      {badge()}
      <Ionicons name="notifications-outline" size={24} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
