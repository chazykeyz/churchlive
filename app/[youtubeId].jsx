import { View, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { PREACHER } from "./utils/constants";
import axios from "axios";

const width = Dimensions.get("window");
const height = (width.width * 9) / 16;

const Player = () => {
  const { params } = useRoute();

  const [StreamData, setStreamData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${PREACHER}${params.youtubeId}/`);
      setStreamData(data);
    };
    if (params) {
      fetchData();
    }
  }, [params]);

  const videoId = StreamData?.stream_link_id;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  //   change screen orientation
  useEffect(() => {
    const changeScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    changeScreenOrientation();
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View className="flex-1 bg-black justify-center items-center relative">
      <Pressable
        onPress={() => {
          router.back();
        }}
        className="absolute z-20 top-10 left-10"
      >
        <View className="h-10 w-10 rounded-full bg-black/60 border border-white/10 flex justify-center items-center ">
          <Ionicons name="chevron-back" size={24} color="white" />
        </View>
      </Pressable>
      <WebView
        style={{
          width: width.width,
          height: height,
        }}
        javaScriptEnabled={true}
        source={{ uri: embedUrl }}
      />
    </View>
  );
};

export default Player;
