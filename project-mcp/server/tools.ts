import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { LHUtilTools } from "./LHTools";

export const tools: Tool[] = [
  {
    name: "api_create",
    description: "创建一个新的接口",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "接口 URL",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "api_get",
    description: "获取接口信息",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "接口 URL",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "api_update",
    description: "更新接口",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "接口 URL",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "api_delete",
    description: "删除接口",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "接口 URL",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "api_list",
    description: "列出所有接口",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "api_create_yapi",
    description: "获取YAPI接口定义信息。当用户输入包含https://yapi.lucahealthcare.cn/的URL时，爬取页面获取接口详情，包含接口名称、请求方法、请求路径、请求参数、返回参数等信息。",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "YAPI接口URL",
        },
        userName: {
          type: "string",
          description: "可选，YAPI账号用户名",
        },
        userPwd: {
          type: "string",
          description: "可选，YAPI账号密码",
        },
        envPath: {
          type: "string",
          description: "可选，环境变量文件路径，默认为yapi.env",
        },
      },
      required: ["url"],
    },
  },
  ...LHUtilTools
];
