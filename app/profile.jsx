import { Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView>
        <Text className="text-white text-3xl  font-bold">Profile</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
