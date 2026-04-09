import asyncio
from webbrowser import get
import websockets
import json
import os
from datetime import datetime

HOST = "localhost"
PORT = 5200
connected_clients = set()
TAG_BROWSER_LH_CLIENT = "browser-lh-client"
TAG_MCP_LH_CLIENT = "mcp-lh-client"

realtime_lh_client_data:str=""

async def handle_client(websocket, path):
    global realtime_lh_client_data
    client_id = f"{websocket.remote_address}"
    print(f"Client connected: {client_id}")
    connected_clients.add(websocket)
    
    try:
        await websocket.send(json.dumps({
            "type": "awk",
            "from":"lh-server",
            "message": "Successfully connected to prompt server",
            "timestamp": datetime.now().isoformat()
        }))

        async for message in websocket:
            try:
                data = json.loads(message) if isinstance(message, str) else message
               
                tag=data.get("tag","")

                if(TAG_BROWSER_LH_CLIENT==tag):
                    response = {
                        "type": "chat",
                        "from":"lh-server",
                        "tag":tag,
                        "data": data,
                        "timestamp": datetime.now().isoformat()
                    }
                    realtime_lh_client_data=data.get("data","")
                    
                elif(TAG_MCP_LH_CLIENT==tag):
                    response = {
                        "type": "chat",
                        "from":"lh-server",
                        "tag":TAG_MCP_LH_CLIENT,
                        "data": realtime_lh_client_data,
                        "timestamp": datetime.now().isoformat()
                    }
                    await websocket.send(json.dumps(response))
                else:
                    response = {
                        "type": "invalid-tag",
                        "from":"lh-server",
                        "message": "Invalid tag",
                        "timestamp": datetime.now().isoformat()
                    }
                    await broadcast(response,ignore_client=websocket)
            except Exception as e:
                await websocket.send(json.dumps({
                    "type": "error",
                    "from":"lh-server",
                    "message": str(e),
                    "timestamp": datetime.now().isoformat()
                }))
                
    except websockets.exceptions.ConnectionClosed:
        print(f"Client disconnected: {client_id}")
    finally:
        connected_clients.remove(websocket)


async def broadcast(message,ignore_client=None):
    if connected_clients:
        await asyncio.gather(
            *[client.send(json.dumps(message)) for client in connected_clients if client!=ignore_client],
            return_exceptions=True
        )


async def main():
    print(f"Starting WebSocket server on ws://{HOST}:{PORT}")
    async with websockets.serve(handle_client, HOST, PORT):
        print(f"Server is running on ws://{HOST}:{PORT}")
        print("Press Ctrl+C to stop the server")
        await asyncio.Future()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nServer stopped")
