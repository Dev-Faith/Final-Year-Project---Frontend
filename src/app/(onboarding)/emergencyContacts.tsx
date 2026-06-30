import { CustomButton } from "@/components/ui/CustomButton";
import CustomText from "@/components/ui/CustomText";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]+$/;

const emergencyContactFormSchema = z.object({
  fullname: z.string().min(1, "Full name is required!"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits long!")
    .regex(phoneRegex, "Invalid phone number format!"),
  relationship: z.string().min(1, "Relationship is required!"),
});

type EmergencyContactFormValues = z.infer<typeof emergencyContactFormSchema>;

export default function EmergencyContactsScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmergencyContactFormValues>({
    defaultValues: {
      fullname: "",
      phoneNumber: "",
      relationship: "",
    },
    mode: "onChange",
    resolver: zodResolver(emergencyContactFormSchema),
  });

  const onSubmit = (data: EmergencyContactFormValues) => {
    console.log("Form submitted:", data);

    Alert.alert(
      "Emergency Contact Saved",
      "Your emergency contact has been saved successfully.",
      [
        {
          text: "Finish Setup",
          onPress: () => router.replace("/(dashboard)"),
        },
      ],
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
      >
        <View style={styles.textContainer}>
          <CustomText bold style={styles.h2}>
            Who should we notify?
          </CustomText>
          <CustomText style={styles.body}>
            Add the primary person to alert if the hardware detects a fall.
          </CustomText>
        </View>
        <View style={styles.formContainer}>
          <View>
            <CustomText style={styles.label}>Full Name:</CustomText>
            <Controller
              name="fullname"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  placeholder="e.g Akindele Chioma Haruna"
                />
              )}
            />
            {errors.fullname && (
              <CustomText style={styles.errorText}>
                {errors.fullname.message}
              </CustomText>
            )}
          </View>
          <View>
            <CustomText style={styles.label}>Phone Number:</CustomText>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  placeholder="e.g +234 803 123 4567"
                />
              )}
            />
            {errors.phoneNumber && (
              <CustomText style={styles.errorText}>
                {errors.phoneNumber.message}
              </CustomText>
            )}
          </View>
          <View>
            <CustomText style={styles.label}>Relationship:</CustomText>
            <Controller
              name="relationship"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={styles.input}
                  placeholder="e.g., Daughter, Doctor"
                />
              )}
            />
            {errors.relationship && (
              <CustomText style={styles.errorText}>
                {errors.relationship.message}
              </CustomText>
            )}
          </View>
        </View>
        <CustomButton
          title="Save & Finish Setup"
          variant={isValid ? "primary" : "secondary"}
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 64,
    alignItems: "center",
    justifyContent: "center",
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
});
