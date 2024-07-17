import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const OtpVerify = () => {
  const [otpToken, setOtpToken] = useState("");
  const [validation, setValidation] = useState("");

  const handleSubmit = () => {
    if (otpToken.length === 0) {
    }
    if (otpToken.length === 0) {
      setValidation("OTP field can't be empty!");
    } else if (otpToken.length > 4) {
      setValidation("OTP can't exceed 10 characters!");
    } else if (otpToken.length < 4) {
      setValidation("OTP can't be less than 10 characters!");
    } else {
      router.replace("/");
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      <ScrollView>
        <View className="flex-1 min-h-screen items-center justify-center ">
          <Text className="text-lg font-black text-white">CHURCH•LIVE</Text>
          <View className="h-10" />
          <Text className="text-3xl font-bold text-white">OTP Password</Text>
          <View className=" w-screen  p-4">
            <View className="h-[1px] bg-white/20 w-full " />
          </View>
          <View className="w-screen px-4">
            {validation && <Text className="text-red-500">{validation}</Text>}
            <TextInput
              className={`bg-white/10 text-white w-full py-4 rounded-lg px-2 border ${
                validation ? "border-red-500 mt-1" : "border-white/20"
              }`}
              inputMode="numeric"
              placeholder="OTP numbers"
              maxLength={4}
              onChangeText={(value) => {
                setValidation("");
                setOtpToken(value);
              }}
            />
            <Text className="text-white/50 p-3">
              Fill OTP password sent to the number you registered/logined with
              if you don’t get the OTP kindly click sent again.
            </Text>
            <Text className="text-blue-600 px-3 pb-4 text-lg font-bold">
              Send again
            </Text>

            <Pressable onPress={handleSubmit}>
              <View className="w-full p-3 rounded-lg bg-blue-600 my-2 flex items-center">
                <Text className="text-white text-lg">Finish</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpVerify;
