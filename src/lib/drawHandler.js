import canvasState from '../store/canvasState'
import  Brush  from '../tools/Brush'
import Circle from '../tools/Circle'
import  Rect  from '../tools/Rect'
import  Eraser  from '../tools/Eraser'
import  Line  from '../tools/Line'
import  Text  from '../tools/Text'

export const drawHandler = msg => {
    const figure = msg.figure
    const ctx = canvasState.canvas.getContext('2d')
    switch ( figure.type ){
        case 'brush':
            Brush.draw(ctx, figure.x, figure.y, figure.color, figure.width)
            break
        case 'rect':
            Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
            break
        case 'circle':
            Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.color)
            break
        case 'eraser':
            Eraser.staticDraw(ctx, figure.startX, figure.startY, figure.x, figure.y, figure.width)
            break
        case 'line':
            Line.staticDraw(ctx, figure.startX, figure.startY, figure.endX, figure.endY, figure.color, figure.width)
            break
        case 'text':
            Text.staticDraw(ctx, figure.text, figure.x, figure.y, figure.fontSize, figure.color)
            break
            case 'clear':
            canvasState.clear()    
            break               
        case 'finish':
            ctx.beginPath()
            ctx.globalCompositeOperation='source-over'
            break    
    }
}