import React from 'react';
import "./lisi.less"
import Taro from "@tarojs/taro"
import {useEffect,useState} from "react"
import {View,Text} from "@tarojs/components"

export default function lisiPage() {
  return (
    <View className={`lisi-page`}>
      <Text>Hello, lisi!</Text>
    </View>
  );
};
