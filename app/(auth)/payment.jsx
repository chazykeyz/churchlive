import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import logo from "@/assets/images/logo.png";
import * as Securestore from "expo-secure-store";

const Payment = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validation, setValidation] = useState("");

  const handleSubmit = () => {
    if (phoneNumber.length === 0) {
      setValidation("Phone number field can't be empty!");
    }
    if (phoneNumber[0] !== "0") {
      setValidation("Phone number must start with number 0!");
    } else if (phoneNumber.length > 10) {
      setValidation("Phone number can't exceed 10 characters!");
    } else if (phoneNumber.length < 10) {
      setValidation("Phone number can't be less than 10 characters!");
    } else {
      router.replace("/");
    }
  };

  useEffect(() => {
    const authDetail = async () => {
      return await Securestore.getItemAsync("authDetail");
    };
    if (authDetail) {
      authDetail().then((item) => {
        const parseData = JSON.parse(item);
        setPhoneNumber(parseData.phone_number);
      });
    }
  }, []);
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      <ScrollView>
        <View className="flex-1 min-h-screen items-center justify-center ">
          <Image source={logo} className="w-[100px] object-cover h-[100px]" />

          <Text className="text-3xl font-bold text-white">Payments</Text>
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
              placeholder="Payment numbers"
              maxLength={10}
              value={phoneNumber}
              onChangeText={(value) => {
                setValidation("");
                setPhoneNumber(value);
              }}
            />
            <Text className="text-white/50 p-3">
              Make payment using this above phone number to access the live
              contents
            </Text>

            <Pressable onPress={handleSubmit}>
              <View className="w-full p-3 rounded-lg bg-red-700 my-2 flex items-center">
                <Text className="text-white text-lg">Pay</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
