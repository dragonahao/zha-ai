export default {
  lazyCodeLoading: "requiredComponents",
  pages: [],
  subPackages: [
    {
      root: "pages/a",
      pages: ["b/c"],
    },
    {
      root: "pages/bd",
      pages: ["a/c/d"],
    },
    {
      root: "pages/tmpl",
      pages: ["abs/template/liuxiu", "a/b/c"],
    },
    {
      root: "pages/ta",
      pages: ["A/B/C", "A/C", "A/C/male", "A/C/female"],
    },
    {
      root: "pages/over",
      pages: ["A/G"],
    },
    {
      root: "pages/overdue",
      pages: [
        "libai/chengzhou",
        // 李白乘舟2号
        "libai/chengzhou2",
        "libai/chengzhou3",
        "libai/chengzhou4",
      ],
    },
  ],

  permission: {
    "scope.userLocation": {
      desc: "搜索周围蓝牙设备", // 周围蓝牙设备
    },
    "scope.bluetooth": {
      desc: "用于蓝牙功能", //蓝牙功能
    },
  },
};
