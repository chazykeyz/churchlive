import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { Link, router } from "expo-router";
import axios from "axios";
import { PREACHER } from "./utils/constants";

const Home = () => {
  const [StreamData, setStreamData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchData = async () => {
    const { data } = await axios.get(PREACHER);
    setStreamData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  return (
    <View className="bg-black flex-1 ">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Link href="register">
          <Text className="">Login</Text>
        </Link>
        <View className="mx-3 ">
          <Text className="text-3xl font-bold text-white mt-4 mb-2">
            Recent lives
          </Text>
          <View className="w-full ">
            {StreamData.map((item, index) => (
              <PreacherCard
                key={index}
                image={item.thumbnail}
                name={item.preacher_name}
                churchName={item.church_name}
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
  const { width } = Dimensions.get("window");
  const height = (width * 9) / 16;
  return (
    <Pressable
      onPress={() => {
        router.push(`/${1}`);
      }}
    >
      <View className=" my-1 overflow-hidden w-full rounded-xl border border-white/40">
        <Image
          className=" bg-white/10"
          style={{
            height: height,
            width: width,
          }}
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
              className="mr-12 text-white uppercase ml-1"
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
