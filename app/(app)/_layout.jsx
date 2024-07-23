import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "black", color: "white" },
        headerTitleStyle: {
          color: "white",
          fontWeight: "bold",
          fontSize: "15px",
        },
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerLeft: () => (
            <View className="flex flex-row">
              <Text className="text-white text-lg font-bold">CHURCH</Text>
              <Text className="text-red-500 text-lg font-bold ">•</Text>
              <Text className="text-white text-lg font-bold">LIVE</Text>
            </View>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push("profile");
              }}
            >
              <Ionicons name="person-circle-outline" size={35} color="white" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="[youtubeId]" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitle: "Profile",
          headerBackTitle: "Home",
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default _layout;
