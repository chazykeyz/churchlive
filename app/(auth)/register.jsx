import { View, Text, TextInput, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import logo from "@/assets/images/logo.png";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleSubmit = () => {
    if (phoneNumber.length === 0) {
      setValidation((prev) => ({
        ...prev,
        ["phoneNumber"]: "Phone number field can't be empty!",
      }));
    } else if (phoneNumber.length > 10) {
      setValidation((prev) => ({
        ...prev,
        ["phoneNumber"]: "Phone number can't exceed 10 characters!",
      }));
    } else if (phoneNumber.length < 10) {
      setValidation((prev) => ({
        ...prev,
        ["phoneNumber"]: "Phone number can't be less than 10 characters!",
      }));
    } else if (phoneNumber[0] !== "0") {
      setValidation((prev) => ({
        ...prev,
        ["phoneNumber"]: "Phone number must start with number 0!",
      }));
    } else if (password.length === 0) {
      setValidation((prev) => ({
        ...prev,
        ["password"]: "Password field can't be empty!",
      }));
    } else if (password.length > 0 && password.length < 5) {
      setValidation((prev) => ({
        ...prev,
        ["password"]: "Password should contain atleast four characters!",
      }));
    } else {
      router.push("payment");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <View className="bg-black flex items-center">
        <Image source={logo} className="w-[100px] object-cover h-[100px]" />
        <View className="h-2" />
        <Text className="text-3xl font-bold text-white">Register</Text>
        <View className=" w-screen  p-4">
          <View className="h-[1px] bg-white/20 w-full " />
        </View>
        <View className="w-screen px-4">
          <Text className="text-white/60 pb-1 text-lg">Phone number</Text>
          {validation.phoneNumber && (
            <Text className="text-red-500">{validation.phoneNumber}</Text>
          )}
          <TextInput
            className={`bg-white/10 text-white w-full py-4 rounded-lg px-2 border ${
              validation.phoneNumber ? "border-red-500 mt-1" : "border-white/20"
            }`}
            inputMode="numeric"
            maxLength={10}
            placeholder="Eg 07** *** ***"
            onChangeText={(value) => {
              setValidation((prev) => ({
                ...prev,
                ["phoneNumber"]: "",
              }));

              setPhoneNumber(value);
            }}
          />
          <Text className="text-white/60 pb-1 text-lg">Password</Text>
          {validation.password && (
            <Text className="text-red-500">{validation.password}</Text>
          )}
          <TextInput
            className={`bg-white/10 text-white w-full py-4 rounded-lg px-2 border ${
              validation.password ? "border-red-500 mt-1" : "border-white/20"
            }`}
            placeholder="password"
            onChangeText={(value) => {
              setValidation((prev) => ({
                ...prev,
                ["password"]: "",
              }));
              setPassword(value);
            }}
          />
          <Pressable onPress={handleSubmit}>
            <View className="w-full p-3 rounded-lg bg-red-700 my-2 flex items-center">
              <Text className="text-white text-lg">register</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("payment");
            }}
          >
            <Text className="text-white/70">Aready have an account?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
