import React from "react";
import "./fileName.scss";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";

export default function fileNamePage() {
  return (
    <View className={`fileName-page`}>
      <Text>Hello, fileName!</Text>
    </View>
  );
}
