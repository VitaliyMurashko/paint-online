import canvasState from '../store/canvasState';
import { drawHandler } from './drawHandler';

export const socketHandler = () => {
    const socket = new WebSocket( `ws://localhost:5000/` )
    socket.onopen = (e) => {
        
        canvasState.setSystemMessage({
            msg:'соединение установлено',
            variant:'success'
        })
        socket.send(JSON.stringify({
            id:canvasState.sessionId,
            username:canvasState.username || `user${Math.ceil(Date.now() - Math.random()*2345)}`,
            method: "connection"
        }))
        socket.onmessage = (e) => {
            let msg = JSON.parse(e.data)
            switch (msg.method) {
                case "connection":
                    canvasState.setSystemMessage({
                        msg:`пользователь ${msg.username} подключился`,
                        variant:'success'
                    })
                break
                case "updateUserList":
                    canvasState.setClientsList(msg.clients)
                break    
                case "draw":
                    drawHandler(msg)
                break    
                case "close":
                    canvasState.setSystemMessage({
                        msg:`пользователь ${msg.username}  вышел`,
                        variant:'warning'
                    }) 
                  
                break   
            }
        }

        socket.onclose = (e) => {
            canvasState.setSystemMessage({
                msg:'Соединение с сервером потеряно',
                variant:'error'
            })
            socket.send(JSON.stringify({
                id:canvasState.sessionId,
                username:canvasState.username,
                method: "close"
            }))
        }
        
       
    }
     
    

    return socket
}