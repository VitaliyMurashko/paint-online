import Tool from './Tool.js'

export default class Eraser extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
        this.name = 'Eraser'
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }
    mouseUpHandler(e) {
        this.mouseDown = false
        this.ctx.globalCompositeOperation='source-over'
        this.socket.send(JSON.stringify({
            method:'draw',
            id:this.id,
            figure: {
                type: 'finish',
            }
        }))
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.ctx.beginPath();
        this.ctx.globalCompositeOperation = 'destination-out'
        this.ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y)
        
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.send(JSON.stringify({
                method:'draw',
                id:this.id,
                figure: {
                    type: 'eraser',
                    startX:this.x,
                    startY:this.y,
                    x:e.pageX - e.target.offsetLeft,
                    y:e.pageY - e.target.offsetTop,
                    width: this.ctx.lineWidth
                }
            }))
          }

 
    }

    draw(x,y) {  
        this.ctx.lineTo(x,y)
        this.ctx.stroke()
    }

    static staticDraw(ctx, startX, startY, x, y, width) {
        ctx.lineWidth = width
        ctx.globalCompositeOperation = 'destination-out'
        ctx.lineTo(x, y)
        ctx.moveTo(x, y)
        ctx.stroke()
        
    }
}