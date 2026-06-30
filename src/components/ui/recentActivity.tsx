import { FlatList, StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

const activityData = [
  { id: 1, title: "Logged in", timestamp: "8am, today" },
  { id: 2, title: "Viewed Dashboard", timestamp: "6:25am, today" },
  { id: 3, title: "Updated Profile", timestamp: "11pm, yesterday" },
//   { id: 4, title: "Logged out", timestamp: "7pm, yesterday" },
];

export const RecentActivities = () => {
  return (
    <View>
      <View style={styles.header}>
        <CustomText bold style={{ fontSize: 16 }}>
          Recent Activity
        </CustomText>
        <CustomText style={{ fontSize: 16 }}>see all</CustomText>
          </View>
          <FlatList
          data={activityData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.activityItem}>
              <CustomText style={{ fontSize: 16 }}>
                {item.title}
              </CustomText>
              <CustomText style={{ fontSize: 14, color: "#64748B" }}>
                {item.timestamp}
              </CustomText>
            </View>
          )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
    activityItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
    }
});
