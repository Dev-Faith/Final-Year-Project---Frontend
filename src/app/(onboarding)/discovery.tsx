import { CustomButton } from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import { Image, StyleSheet, View } from "react-native";

export default function DiscoveryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <CustomText style={styles.h2} bold>
          Let's link your device.
        </CustomText>
        <CustomText style={styles.body}>
          Bring the walking stick close to your phone. Press and hold the
          pairing button on the stick's handle for 3 seconds
        </CustomText>
      </View>
      <Image
        source={require("@/assets/images/radio.png")}
        style={[{ width: 363, height: 363 }, styles.image]}
      />
      <CustomText style={styles.body}>Searching for your device...</CustomText>
      <CustomButton
        title="Pair Device"
        variant="secondary"
        style={{ marginTop: 64 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  h2: {
    fontSize: 24,
  },
  body: {
    fontSize: 18,
    color: "#475569",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  image: {},
});
