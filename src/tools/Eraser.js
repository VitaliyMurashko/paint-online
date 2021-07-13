import Tool from './Tool.js'

export default class Eraser extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }
    mouseUpHandler(e) {
        this.mouseDown = false
        this.ctx.globalCompositeOperation='source-over'
        this.ctx.lineWidth = 1;
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        var x = e.offsetX;
        var y = e.offsetY;
        this.ctx.beginPath();
        this.ctx.globalCompositeOperation = 'destination-out'
        this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.lineWidth = 20;
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
          }
    }

    draw(x,y) {
        this.ctx.lineTo(x,y)
        this.ctx.stroke()
    }
}