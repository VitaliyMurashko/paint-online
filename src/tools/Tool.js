export default class Tool {
    constructor(canvas, socket, id) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

     setFillColor(color){
        this.ctx.fillStyle = color
    }

     setStrokeColor(color){
        this.ctx.strokeStyle = color
    }

     setLineWidth(width) {
        this.ctx.lineWidth = width
    }

    setFontSize(size) {
        this.ctx.fontSizeWidth = size
    }

    destroyEvents() {
        this.canvas.onmousemove = null;
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
        this.canvas.onmouseleave = null;
    }
}