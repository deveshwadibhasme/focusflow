import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import ProfileScreen from "../../screens/ProfileScreen";

export default function ProfileTab() {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFE]" edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        className="px-5 pt-3"
      >
        <Header />
        <ProfileScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

