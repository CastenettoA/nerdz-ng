"""handle the logic for connect to the /notification webSocket endpoint"""
import asyncio
import websockets
import socketio # try why this seems simpler

# url = f"{NOTIFICATIONS_WS_URL}?access_token="

# with socketio.AsyncSimpleClient as sio:
#     await sio.connect(url)
#     # sio.connect('http://localhost:5000', transports=['websocket']) # use this to connect directly with ws instead passing from long-polling transport


# """
# socketio docs.
# - [SID] client a unique session identifier. print('my sid is', sio.sid)
# """