import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { router } from "expo-router";

const Home = () => {
  const StreamData = [
    {
      image:
        "https://www.mwananchi.co.tz/resource/image/3004628/landscape_ratio16x9/1600/900/4ef50da59fcfb10451ce9fdd774e08a/Mi/mwamposaa1-pic.jpg",
      title:
        "  Ibada ya jumapili kutoka madhabahu ya moto kuvuka eneo lake lote kwa wale",
      name: "Apostel Mwamposa",
      churchName: "Rise and shine",
    },
    {
      image:
        "https://www.thecitizen.co.tz/resource/image/3490756/landscape_ratio3x2/1620/1080/c17b0603ccd7cddc7e244ef0e08563c/TT/gwajima-pic.jpg",
      title:
        "  Ibada ya jumapili kutoka madhabahu ya moto kuvuka eneo lake lote kwa wale",
      name: "Gwagima ",
      churchName: "Ufufuo na uzima",
    },
    {
      image:
        "https://i.ytimg.com/vi/gIbEKAwE5YU/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgWygvMA8=&rs=AOn4CLBLjOgqtdxgdascRJNk6b5DMCPmwQ",
      title:
        "  Ibada ya jumapili kutoka madhabahu ya moto kuvuka eneo lake lote kwa wale",
      name: "Mzee wa upako ",
      churchName: "Ufufuo na uzima",
    },
  ];

  return (
    <View className="bg-black flex-1 ">
      <ScrollView>
        {/* <Link href="login">
          <Text className="">Login</Text>
        </Link> */}
        <View className="mx-3 ">
          <Text className="text-3xl font-bold text-white mt-4 mb-2">
            Recent lives
          </Text>
          <View className="w-full ">
            {StreamData.map((item, index) => (
              <PreacherCard
                key={index}
                image={item.image}
                name={item.name}
                churchName={item.churchName}
                title={item.title}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const PreacherCard = ({ image, title, name, churchName }) => {
  return (
    <Pressable
      onPress={() => {
        router.push(`/${1}`);
      }}
    >
      <View className=" my-1 overflow-hidden w-full rounded-xl border border-white/40">
        <Image
          className="w-full h-[220px] bg-white/10"
          alt="preacher_image"
          source={{
            uri: image,
          }}
        />

        <View className="py-3 px-2 bg-white/20 flex">
          <View className="flex-row  items-center  ">
            {/* <Ionicons name="radio-sharp" size={24} color="red" /> */}
            <Text className=" text-red-600 font-bold">LIVE</Text>
            <Text
              className="mr-12 text-white uppercase"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>
          <Text className="text-white/70 mt-1">
            {name} • {churchName}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
