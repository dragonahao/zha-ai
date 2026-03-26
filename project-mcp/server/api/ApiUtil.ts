import fs from "fs";

export class ApiUtil {
  static async create(url: string) {
    return {
      code: 0,
      msg: "success",
      data: {
        name: "create",
        description: "创建接口",
      },
    };
  }

  static async get(url: string) {
    return {
      code: 0,
      msg: "success",
      data: {
        name: "get",
        description: "获取接口",
      },
    };
  }

  static async update(url: string) {
    return {
      code: 0,
      msg: "success",
      data: {
        name: "update",
        description: "更新接口",
      },
    };
  }

  static async delete(url: string) {
    return {
      code: 0,
      msg: "success",
      data: {
        name: "delete",
        description: "删除接口",
      },
    };
  }

  static async list() {
    let result =  fs.lstatSync("./");
    return {
      code: 0,
      msg: "success",
      data: {
        name: "list",
        description: "列出所有接口",
        result:result
      },
    };
  }
}