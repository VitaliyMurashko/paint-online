import React from 'react';
import toolState from '../store/toolState';
import '../styles/toolbar.scss';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import canvasState from '../store/canvasState';

export const Toolbar = () => {
    return (
        <div className="toolbar">
            <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))}/>
            <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}/>
            <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}/>
            <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}/>
            <button className="toolbar__btn line" onClick={() => toolState.setTool(new Line(canvasState.canvas))}/>
            <input type='color' style={{marginLeft:10}} onChange={(e) => toolState.setColor(e.target.value)}/>
            <button className="toolbar__btn undo"/>
            <button className="toolbar__btn redo"/>
            <button className="toolbar__btn save"/>
        </div>
    );
}
