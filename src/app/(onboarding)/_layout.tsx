import { Text, View } from "react-native";
import { Stack } from "expo-router";


export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
        <Stack>
           <Stack.Screen name="index" options={{ headerShown: false }} />
           <Stack.Screen name="discovery" options={{ headerShown: false }} />
        </Stack>
    )
}