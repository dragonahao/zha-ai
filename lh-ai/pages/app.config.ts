export default {
  lazyCodeLoading: "requiredComponents",
  pages: [
    "pages/index",
    "pages/classroom",
    "pages/my",
    "pages/dataSummary",
    "pages/viewWeb",
    "pages/joinSite",
    "pages/qrcode",
    "pages/report/index",
    "pages/smart-form/index",
    "pages/jumpCoughSearch",
  ],
  subPackages: [
    {
      // 插件
      root: "pages/lucaPluginSubPackage/",
      pages: ["index", "webview", "report"],
      plugins: {
        lucaDbmPlugin: {
          version: "1.2.11",
          provider: "wx2013027ae7464797",
        },
      },
    },
    {
      // algorithm
      root: "pages/algorithm/",
      pages: ["kesou/index", "kesou/introduction", "kesou/recording", "kesou/result"],
    },
    {
      // my
      root: "pages/mySub/",
      pages: [
        "crf",
        "myCrf",
        "myDrugs",
        "myDrugsStore",
        "weekFinished",
        "weeklyUpdate",
        "healthyDayTaskReport",
        "healthyReport",
        "monthlyUpdate",
      ],
    },
    {
      // my
      root: "pages/homeSub/",
      pages: [
        "agreement",
        "dailyClock",
        "multiSelect",
        "register",
        "relist",
        "resultDistribute",
        "smartDevice",
        "surveyReportList",
        "symptomInquiry",
        "symptomList",
        // "dtx",
        "questionnaire",
        "scaleInfo",
        "followVideo",
        "crf",
        "loading",
        "formCompleted",
        "indexNoLoginHome",
      ],
    },
    {
      // 检测 音频
      root: "pages/acquisition/voice",
      pages: ["index", "detect"],
    },
    {
      // 检测 加速度计陀螺仪
      root: "pages/acquisition/accelerometer",
      pages: ["index", "detect", "gravity_calibration/gyroscope"],
    },
    {
      // 肺功能
      root: "pages/lung",
      pages: ["index", "blow", "vowel", "disease", "info"],
    },
    {
      // 上传
      root: "pages/dbm-uploader",
      pages: ["index", "failure"],
    },
    {
      // 智能设备
      root: "pages/sdc",
      pages: ["index"],
    },
    {
      // 睡眠垫子
      root: "pages/sleeping-pad",
      pages: [
        "introduce/index",
        "bind/index",
        "report/index",
        "detail/index",
        "detailx2/index",
        "connectwifi/config/index",
        "connectwifi/scan/index",
      ],
    },
    {
      root: "pages/user-gender-age",
      pages: ["index"],
    },
    {
      // 肺功能
      root: "pages/lung-plugin",
      pages: ["introduce/index", "info/info", "vowel/vowel", "blow/blow", "disease-scale/index", "upload/index"],
    },
    {
      root: "pages/settings",
      pages: ["index"],
    },
    {
      root: "pages/reportlist",
      pages: ["list/index","detail/index"],
    },
    {
      // 智能表单相关页面
      root: "pages/smart-form-result",
      pages: ["index"],
    },
    {
      // 智能表单相关页面
      root: "pages/smart-form-list",
      pages: ["index","crf/crf-list/index","crf/crf-detail/index"],
    },
    {
      // swing
      root: "pages/swing",
      pages: ["user/zhangsan/zhangsan", "user/lisi/lisi"],
    },
    
     
  ],
  window: {
    backgroundTextStyle: "light",
    backgroundColor: "#F7F7F7",
    navigationBarBackgroundColor: "#EDEDED",
    navigationBarTitleText: "Luca healthcare",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#9B9B9B",
    selectedColor: "#009EDF",
    borderStyle: "white",
    list: [
      {
        iconPath: "assets/home.png",
        selectedIconPath: "assets/home-selected.png",
        pagePath: "pages/index",
        text: "首页",
      },
      {
        iconPath: "assets/classroom.png",
        selectedIconPath: "assets/classroom-selected.png",
        pagePath: "pages/classroom",
        text: "小课堂",
      },
      // {
      //   iconPath: "assets/summary.png",
      //   selectedIconPath: "assets/summary-select.png",
      //   pagePath: "pages/dataSummary",
      //   text: "数据小结",
      // },
      {
        iconPath: "assets/my.png",
        selectedIconPath: "assets/my-selected.png",
        pagePath: "pages/my",
        text: "我的",
      },
    ],
  },
  permission: {
    "scope.userLocation": {
      desc: "搜索周围蓝牙设备", // 周围蓝牙设备
    },
    "scope.bluetooth": {
      desc: "用于蓝牙功能", //蓝牙功能
    },
  },
}
