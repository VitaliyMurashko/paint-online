import React, {useState, useEffect, useRef} from 'react';
import '../styles/canvas.scss';
import  { observer } from 'mobx-react-lite';
import canvasState from '../store/canvasState'


const Canvas = observer(() => {
    const canvasRef = useRef() 
    const canvasWrapperRef = useRef()
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() =>{
        canvasState.setCanvas(canvasRef.current)
        window.onresize = ()=> {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
            }
      
            return () => window.onresize = null
    },[])

    return (
        <div className="canvas" ref={canvasWrapperRef}>
            <canvas ref={canvasRef} width={width - 2} height={height - 80}/>
        </div>
    );
});

export default Canvas
