import { CustomTabBar } from "@/components/navigation/customTabBar";
import { BlurTargetView } from "expo-blur";
import { Tabs } from "expo-router";
import { useRef } from "react";

export default function dashboardLayout() {
  const targetRef = useRef(null);
  return (
    <BlurTargetView ref={targetRef} style={{ flex: 1 }}>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} blurTarget={targetRef} />}
      >
        <Tabs.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Tabs.Screen name="map" options={{ headerShown: false }} />
        <Tabs.Screen
          name="settings"
          options={{ title: "Settings", headerShown: false }}
        />
      </Tabs>
    </BlurTargetView>
  );
}
