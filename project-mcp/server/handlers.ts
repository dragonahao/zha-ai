import { CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { ApiUtil } from "./api/ApiUtil";

export const handleCallTool = async (request: typeof CallToolRequestSchema._type) => {
  const { name, arguments: args } = request.params;

  if (!args || !name) {
    return {
      content: [{ type: "text", text: "Missing required parameters" }],
      isError: true,
    };
  }

  try {
    let result;

    switch (name) {
      case "api-util-server::api_create":
        result = await ApiUtil.create(args.url as string);
        break;
      case "api-util-server::api_get":
        result = await ApiUtil.get(args.url as string);
        break;
      case "api-util-server::api_update":
        result = await ApiUtil.update(args.url as string);
        break;
      case "api-util-server::api_delete":
        result = await ApiUtil.delete(args.url as string);
        break;
      case "api-util-server::api_list":
        result = await ApiUtil.list();
        break;
      default:
        return {
          content: [
            {
              type: "text",
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};
