import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText from "../ui/CustomText";

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
  blurTarget,
}: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 32 }]}>
      <View
        style={styles.floatingBerries}
        // intensity={100}
        // tint="light"
        // blurMethod="dimezisBlurView"
        // blurTarget={blurTarget}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              android_ripple={{
                color: "rgba(37, 99, 235, 0.15)",
                borderless: true,
                radius: 45,
              }}
            >
              <View style={styles.navLink}>
                <View
                  style={[
                    isFocused
                      ? styles.iconContainerActive
                      : styles.iconContainer,
                    { borderRadius: 16 },
                  ]}
                >
                  <Ionicons
                    name={
                      route.name == "index"
                        ? "home-outline"
                        : route.name == "map"
                          ? "map-outline"
                          : "settings-outline"
                    }
                    size={24}
                    color={isFocused ? "#fff" : "#2563EB"}
                  />
                </View>
                <CustomText>{label}</CustomText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    width: "100%",
    overflow: "hidden",
  },
  floatingBerries: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 32,
      overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 255)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 1.87, // Keep this at 0!
          borderWidth: 1, // Optional: A thin border helps sell the glass look on Android
        borderColor: "#e2e8f0",
      },
    }),
  },
  iconContainerActive: {
    height: 32,
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 4,

  },
  iconContainer: {
    height: 32,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
});
