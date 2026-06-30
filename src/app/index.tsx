import { CustomButton } from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const handleCreateAccount = () => {
    router.push("/discovery");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/blured-stick.png")}
        style={[{ width: 363, height: 363 }, styles.image]}
      />
      <View style={styles.textContainer}>
        <CustomText bold style={styles.h2}>
          Peace of mind, in the palm of your hand.
        </CustomText>
        <CustomText style={styles.body}>
          Connect your intelligent walking stick to monitor safety, track
          location, and receive instant alerts.
        </CustomText>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          title="Create Caregiver Account"
          onPress={handleCreateAccount}
        />
        <CustomButton
          title="Login"
          variant="text"
          onPress={() => router.push("/(dashboard)")}
        />
      </View>
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
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginTop: 45,
  },
  btnContainer: {
    width: "100%",
    marginTop: 64,
  },
  h2: {
    fontSize: 24,
  },
  body: {
    fontSize: 18,
    color: "#475569",
  },
  image: {
    marginLeft: -24,
  },
});
