import { SysArguments } from "../../core/SysArguments";
import { Tool, ToolOutput, ToolScheme } from "../../types/Tool";
import { Http } from "../../http/http";


export class fileName implements ToolScheme {
    static tool: Tool = {
        name: "fileName",
        description: "",
        input: [
            { name: "property", description: "属性描述" },
        ],
        header: [
            //{ name: "", description: "" }
        ],
        usage: ["node dist/saas-cli.js fileName dev '{}' '{}'"]
    }

    checkingInput(args: SysArguments): boolean {
        return true;
    }

    async execute(args: SysArguments): Promise<ToolOutput> {
        const input = args.getInput();
        const response = await Http.get(`${Http.getApiBaseUrl(args)}/xxx`, input, args?.getHeader());
        return { data: response.data };
    }
}
