import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const tools: Tool[] = [
  {
    name: "api-util-server::api_create",
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
    name: "api-util-server::api_get",
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
    name: "api-util-server::api_update",
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
    name: "api-util-server::api_delete",
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
    name: "api-util-server::api_list",
    description: "列出所有接口",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];
