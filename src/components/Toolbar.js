import React, { useRef, useState, useEffect } from "react";
import  { observer } from 'mobx-react-lite';
import toolState from "./../store/toolState";
import "./../styles/toolbar.scss";
import Brush from "./../tools/Brush";
import Rect from "./../tools/Rect";
import Circle from "./../tools/Circle";
import Eraser from "./../tools/Eraser";
import Line from "./../tools/Line";
import Text from "./../tools/Text";
import canvasState from "./../store/canvasState";
import BrushIcon from "@material-ui/icons/Brush";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import IconButton from "@material-ui/core/IconButton";
import TimelineIcon from "@material-ui/icons/Timeline";
import { EraserIcon } from "./Icons/Eraser";
import { RectIcon } from "./Icons/Rect";
import { TextIcon } from "./Icons/TextIcon";

export const Toolbar = observer(() => {
  useEffect(() => {}, [toolState.tool]);
  const inputRef = useRef();
  const [text, setText] = useState("");

    return (
      <div
        className="toolbar"
        onClick={(e) => {
          const children = e.currentTarget.childNodes;
          children.forEach((child) => {
            child.style.background = "rgb(69 43 138 / 0%)";
            if (child.ariaLabel === toolState.tool.name) {
              child.style.background = "rgb(69 43 138 / 40%)";
            }
          });
        }}
      >
        <IconButton
          color="primary"
          aria-label="Brush"
          component="span"
          title="кисть"
          index={0}
          onClick={() =>
            toolState.setTool(
              new Brush(
                canvasState.canvas,
                canvasState.socket,
                canvasState.sessionId
              )
            )
          }
        >
          <BrushIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="Rect"
          component="span"
          title="прямоугольник"
          index={1}
          className="rect"
          onClick={() =>
            toolState.setTool(
              new Rect(
                canvasState.canvas,
                canvasState.socket,
                canvasState.sessionId
              )
            )
          }
        >
          <RectIcon />
        </IconButton>
        <IconButton
          style={{padding:'7px'}}
          color="primary"
          aria-label="Circle"
          component="span"
          title="окружность"
          index={2}
          onClick={() =>
            toolState.setTool(
              new Circle(
                canvasState.canvas,
                canvasState.socket,
                canvasState.sessionId
              )
            )
          }
        >
          <FiberManualRecordIcon fontSize="large"/>
        </IconButton>
        <IconButton
          color="primary"
          aria-label="Line"
          component="span"
          title="линия"
          index={3}
          onClick={() =>
            toolState.setTool(
              new Line(
                canvasState.canvas,
                canvasState.socket,
                canvasState.sessionId
              )
            )
          }
        >
          <TimelineIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="Eraser"
          component="span"
          title="стирка"
          index={4}
          onClick={() =>
            toolState.setTool(
              new Eraser(
                canvasState.canvas,
                canvasState.socket,
                canvasState.sessionId
              )
            )
          }
        >
          <EraserIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="Text"
          component="span"
          title="текст"
          index={5}
          onClick={() =>
            toolState.setTool(
              new Text(
                canvasState.canvas,
                canvasState.socket,
                canvasState.sessionId,
                inputRef
              )
            )
          }
        >
          <TextIcon />
        </IconButton>
        <input
          type="color"
          style={{marginTop:'10px'}}
          id='fillColorInput'
          onChange={(e) => {
            toolState.setFillColor(e.target.value)
          }}
          title="палитра"
          defaultValue="#40b547"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const inputX = e.target.firstChild.offsetLeft ;
            const inputY = e.target.firstChild.offsetTop  ;
            canvasState.socket.send(
              JSON.stringify({
                method: "draw",
                id: canvasState.sessionId,
                figure: {
                  type: "text",
                  x: inputX,
                  y: inputY,
                  text: text,
                  fontSize:toolState.fontSize,
                  color:toolState.strokeColor
                },
              })
            );
            e.target.firstChild.style = { top: "-200px" };
            e.target.firstChild.value = "";
          }}
        >
          <input
            ref={inputRef}
            id="toolTextInput"
            type="text"
            style={{fontSize:`${toolState.fontSize}px`,color:`${toolState.strokeColor}`}}
            onChange={(e) => { 
              setText(e.target.value);
            }}
            onBlur={(e) => (e.target.style.top = "-200px")}
          />
        </form>
      </div>
    );
});
