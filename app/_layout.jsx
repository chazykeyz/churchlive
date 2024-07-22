import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

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
}
