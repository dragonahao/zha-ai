import WebSocket from "ws";

export class LHUtil {
    static TAG_MCP_LH_CLIENT = "mcp-lh-client"
    static wsUrl = "ws://localhost:5200";

    static async getLHPage(): Promise<string> {
        return new Promise((resolve, reject) => {
            console.log(`[LHUtil] 临时创建 WebSocket 连接获取页面信息`);
            
            const ws = new WebSocket(LHUtil.wsUrl);
            let resolved = false;

            const cleanup = () => {
                if (!resolved) {
                    resolved = true;
                }
                ws.close();
            };

            const timeout = setTimeout(() => {
                console.log(`[LHUtil] 获取页面信息超时`);
                cleanup();
                reject(new Error("Timeout waiting for response"));
            }, 10000);

            ws.on("open", () => {
                console.log(`[LHUtil] WebSocket 连接成功，发送请求`);
                const message = { 
                    tag: LHUtil.TAG_MCP_LH_CLIENT, 
                    data: "LHUtil-mcp" 
                };
                ws.send(JSON.stringify(message));
            });

            ws.on("message", (data: WebSocket.Data) => {
                try {
                    const message = JSON.parse(data.toString());
                    console.log(`[LHUtil] 收到消息:`, message);

                    if (message.tag === LHUtil.TAG_MCP_LH_CLIENT &&   message.data != null) {
                        clearTimeout(timeout);
                        cleanup();
                        resolve(message.data);
                    }
                } catch (e) {
                    console.error(`[LHUtil] 解析消息失败:`, e);
                }
            });

            ws.on("error", (error) => {
                console.error(`[LHUtil] WebSocket 错误:`, error);
                clearTimeout(timeout);
                cleanup();
                reject(error);
            });

            ws.on("close", () => {
                console.log(`[LHUtil] WebSocket 连接关闭`);
                if (!resolved) {
                    clearTimeout(timeout);
                    resolved = true;
                    reject(new Error("Connection closed before receiving response"));
                }
            });
        });
    }
}