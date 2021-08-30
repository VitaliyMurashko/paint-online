import React, {useState, useEffect, useRef} from 'react';
import '../styles/canvas.scss';
import  { observer } from 'mobx-react-lite';
import canvasState from '../store/canvasState';
import { useParams } from 'react-router-dom';
import Brush from '../tools/Brush';
import toolState from '../store/toolState';
import axios from 'axios';
import { socketHandler } from '../lib/socket';
import  Alert from './Alert'

const Canvas = observer(() => {
    const canvasRef = useRef() 
    const canvasWrapperRef = useRef()
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const params = useParams()

    useEffect(() =>{
        canvasState.setCanvas(canvasRef.current)
        window.onresize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
            }
            axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    const ctx = canvasRef.current.getContext('2d')
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);  
                }
            })

            return () => window.onresize = null
    },[])

    useEffect(() => {
    const socket = socketHandler() 
    canvasState.setSocket(socket)
    canvasState.setSessionId(params.id)
    toolState.setTool(new Brush(canvasRef.current, socket, params.id))
    return () =>  socket.close()            
    },[canvasState.username])

    
    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
        .then(response => console.log(response.data))
    }

    
    return (
        <div className="canvas" ref={canvasWrapperRef}>
            <Alert systemMessage={canvasState.systemMessage}/>
            <canvas ref={canvasRef} width={width - 60} height={height - 59} 
            onMouseDown={() => mouseDownHandler()}
            />
            
        </div>
    );
});

export default Canvas
