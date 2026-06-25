import CustomText from "../components/ui/CustomText";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function root() {
  return (
    <View style={styles.container}>
      <CustomText bold style={styles.text}>
        Hello
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 36,
  }
})