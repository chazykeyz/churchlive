import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const OtpVerify = () => {
  const handleSubmit = () => {
    router.replace("/");
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      <View className="bg-black flex items-center">
        <Text className="text-lg font-black text-white">CHURCH•LIVE</Text>
        <View className="h-10" />
        <Text className="text-3xl font-bold text-white">OTP Password</Text>
        <View className=" w-screen  p-4">
          <View className="h-[1px] bg-white/20 w-full " />
        </View>
        <View className="w-screen px-4">
          <Text className="text-white/60 pb-1 text-lg">Phone number</Text>

          <Pressable onPress={handleSubmit}>
            <View className="w-full p-3 rounded-lg bg-blue-600 my-2 flex items-center">
              <Text className="text-white text-lg">Finish</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerify;
