import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validation, setValidation] = useState("");

  const handleSubmit = () => {
    if (phoneNumber.length === 0) {
      setValidation("Phone number field can't be empty!");
    } else if (phoneNumber.length > 10) {
      setValidation("Phone number can't exceed 10 characters!");
    } else if (phoneNumber.length < 10) {
      setValidation("Phone number can't be less than 10 characters!");
    } else if (phoneNumber[0] !== "0") {
      setValidation("Phone number must start with number 0!");
    } else {
      router.push("otp");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <View className="bg-black flex items-center">
        <Text className="text-lg font-black text-white">CHURCH•LIVE</Text>
        <View className="h-10" />
        <Text className="text-3xl font-bold text-white">Register</Text>
        <View className=" w-screen  p-4">
          <View className="h-[1px] bg-white/20 w-full " />
        </View>
        <View className="w-screen px-4">
          <Text className="text-white/60 pb-1 text-lg">Phone number</Text>
          {validation && <Text className="text-red-500">{validation}</Text>}
          <TextInput
            className={`bg-white/10 text-white w-full py-4 rounded-lg px-2 border ${
              validation ? "border-red-500 mt-1" : "border-white/20"
            }`}
            inputMode="numeric"
            maxLength={10}
            placeholder="Eg 07** *** ***"
            onChangeText={(value) => {
              setValidation("");

              setPhoneNumber(value);
            }}
          />
          <Pressable onPress={handleSubmit}>
            <View className="w-full p-3 rounded-lg bg-blue-600 my-2 flex items-center">
              <Text className="text-white text-lg">register</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
