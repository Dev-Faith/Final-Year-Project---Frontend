import { CustomButton } from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import { useBLE } from "@/hooks/useBLE";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Pressable } from "react-native";
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { z } from "zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const wifiFormSchema = z.object({
  ssid: z.string().min(1, "Network name is required!"),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

type WifiFormValues = z.infer<typeof wifiFormSchema>;

export default function NetworkSetupScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WifiFormValues>({
    defaultValues: {
      ssid: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(wifiFormSchema),
  });

  const router = useRouter();
  const { sendWiFiCredentials } = useBLE();
  const connectedDevice = useSelector(
    (state: RootState) => state?.ble.connectedDevice,
  );

  const [isSending, setIsSending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const onSubmit = async (data: WifiFormValues) => {
    // Dismiss the keyboard instantly when they hit submit
    Keyboard.dismiss();

    if (!connectedDevice) {
      Alert.alert("Error", "Lost connection to the walking stick.");
      return;
    }

    setIsSending(true);
    const success = await sendWiFiCredentials(
      connectedDevice.id,
      data.ssid,
      data.password,
    );
    setIsSending(false);

    if (success) {
      Alert.alert(
        "Success!",
        "The walking stick is now connecting to your Wi-Fi.",
        [{ text: "Finish Setup", onPress: () => router.replace("/emergencyContacts") }],
      );
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled" // Allows tapping the submit button while keyboard is open
        showsVerticalScrollIndicator={false}
        bottomOffset={20}
      >
        <View style={styles.textContainer}>
          <CustomText style={styles.h2} bold>
            Keep the connection alive.
          </CustomText>
          <CustomText style={styles.body}>
            Connect the stick to your home Wi-Fi. This ensures fall alerts are
            sent to our servers instantly, even if this phone isn't nearby.
          </CustomText>
        </View>
        <Image
          source={require("@/assets/images/wifi.png")}
          style={styles.image}
        />
        <View style={styles.formContainer}>
          <View>
            <CustomText bold style={styles.label}>
              Network Name (SSID):
            </CustomText>
            <Controller
              name="ssid"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.ssid && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="e.g homewifi123"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
            {errors.ssid && (
              <CustomText style={styles.errorText}>
                {errors.ssid.message}
              </CustomText>
            )}
          </View>
          <View>
            <CustomText bold style={styles.label}>
              Password:
            </CustomText>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="***"
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable
                    style={styles.eyeIcon}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Ionicons
                      name={isPasswordVisible ? "eye" : "eye-off"}
                      size={24}
                      color="gray"
                    />
                  </Pressable>
                </View>
              )}
            />
            {errors.password && (
              <CustomText style={styles.errorText}>
                {errors.password.message}
              </CustomText>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {isSending ? (
            <ActivityIndicator size="large" color="#3B82F6" />
          ) : (
            <CustomButton
              title="Send to Walking Stick"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSending}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: "auto", // Pushes the button to the bottom
    marginBottom: 20,
    paddingTop: 40, // Extra space above the button in case of scrolling
    width: "100%",
  },
  textContainer: {
    marginBottom: 32,
  },

  h2: {
    fontSize: 24,
    marginBottom: 16,
  },
  body: {
    fontSize: 18,
    color: "#475569",
  },
  image: {
    width: 163,
    height: 163,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    marginTop: 32,
    gap: 32,
  },
  label: {
    fontSize: 16,
    color: "#0f172a",
  },
  input: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#0f172a",
    borderRadius: 12,
    marginTop: 20,
    fontSize: 16,
    height: 64,
    fontFamily: "artkinson-regular",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    marginTop: 8,
    fontSize: 14,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 40,
  }
});
