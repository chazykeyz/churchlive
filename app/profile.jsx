import { Text, ScrollView, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";

const Profile = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validation, setValidation] = useState("");

  const handleEditProfileSubmit = () => {
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
    <View className="flex-1 bg-black p-3">
      <Text className="text-white text-3xl font-bold">Profile</Text>
      <View className="my-4">
        <Text className="text-white/60 pb-1 text-lg">Edit number</Text>
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
        <Pressable onPress={handleEditProfileSubmit}>
          <View className="w-full p-3 rounded-lg bg-blue-600 my-2 flex items-center">
            <Text className="text-white text-lg">Change</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;
