import React from 'react';
import  { observer } from 'mobx-react-lite';
import toolState from '../store/toolState';
import canvasState from '../store/canvasState';
import IconButton from '@material-ui/core/IconButton';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import SaveIcon from '@material-ui/icons/Save';
import '../styles/toolbar.scss';
import '../styles/settingsBar.scss';
import { downloadImg } from '../lib/downloadImg';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import DeleteIcon from '@material-ui/icons/Delete';

export const SettingsBar = observer(() => {

const clearClickHandler = () => {
    canvasState.socket.send(JSON.stringify({
        method:'draw',
        id:canvasState.sessionId,
        figure: {
            type: 'clear',
        }
    }))
}

    if(toolState.tool && canvasState.canvas){
        return (
            <div className="setings-bar" >
                <div style={{display:'flex', alignItems:'flex-start', flexDirection:'row'}}>
                    {
                        toolState.tool.name === 'Brush' || toolState.tool.name ==='Line' || toolState.tool.name ==='Eraser' || toolState.tool.name === 'Circle' || toolState.tool.name ==='Rect' ?
                        <div className='setting-wrapper'>
                            <label htmlFor="line-width">
                                {toolState.tool.name === 'Circle' || toolState.tool.name ==='Rect' ? 'Толщина контура:' : 'Толщина линии:'}
                            </label>
                            <input 
                            onChange = { e => toolState.setLineWidth(e.target.value)}
                            id="line-width"  
                            type="number" 
                            value={toolState.width} min={1} max={50}/>
                        </div>:
                        null
                    }
                    {
                    toolState.tool.name ==='Text' || toolState.tool.name === 'Circle' || toolState.tool.name ==='Rect' ||  toolState.tool.name ==='Brush' || toolState.tool.name ==='Line' ?
                    <div className='setting-wrapper'>
                        <label htmlFor="stroke-color">{toolState.tool.name === 'Circle' || toolState.tool.name ==='Rect' ? 'Цвет контура:' :'Цвет линии'}</label>
                        <input 
                        onChange = { e => toolState.setStrokeColor(e.target.value)}
                        id="stroke-color"  
                        type="color"
                        style={{maxHeight:'18px',width:'100%'}} 
                        />
                    </div>:
                    null
                    }
                     {
                        toolState.tool.name ==='Text' ?
                            <div className='setting-wrapper'>
                            <label htmlFor="font-size">Размер шрифта:</label>
                            <input 
                            onChange = { e => toolState.setFontSize(e.target.value)}
                            id="font-size"  
                            type="number" 
                            value={toolState.fontSize} min={16} max={50}/>
                            </div>:
                            null
                    }
                </div> 
                <div style={{display:'flex', alignItems:'center'}}>
                    <IconButton title="очистить холст" size="medium" onClick={() =>  clearClickHandler()}><DeleteIcon  fontSize="large"/></IconButton>
                    <IconButton size="medium" onClick={() => canvasState.undo()}><UndoIcon fontSize="large"/></IconButton>
                    <IconButton onClick={() => canvasState.redo()}><RedoIcon fontSize="large"/></IconButton>
                    <IconButton title="скачать изображение" onClick={() => downloadImg()}><SaveIcon fontSize="large"/></IconButton>
                    <div style={{display: 'flex',alignItems:'center', color:'green', marginLeft:'10px', padding:'0 10px', flexDirection:'column'}}>
                        <label htmlFor="usersOnline" style={{fontSize:'10px', color:'gray'}}>в сети:</label> 
                        <span><PeopleRoundedIcon id="usersOnline"/>{canvasState.clientsList.filter((c) => c.id === canvasState.sessionId).length}</span>
                    </div>     
                </div>
                   
            </div>   
        );
    }
    return null
    
})
