import React from 'react';
import "./zhangsan.less"
import Taro from "@tarojs/taro"
import {useEffect,useState} from "react"
import {View,Text} from "@tarojs/components"

export default function zhangsanPage() {
  return (
    <View className={`zhangsan-page`}>
      <Text>Hello, zhangsan!</Text>
    </View>
  );
};
