import Tool from './Tool.js'

export default class Text extends Tool {
    constructor(canvas, socket, id, inputRef) {
        super(canvas, socket, id);
        this.listen();
        this.name = 'Text'
        this.inputRef = inputRef
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this)
    }
    mouseMoveHandler(e) {
        if(this.mouseDown){
            this.currentX = e.pageX 
            this.currentY = e.pageY 
            this.inputRef.current.style.top = e.pageY  +'px'
            this.inputRef.current.style.left = e.pageX  +'px'
            this.ctx.beginPath()
            this.ctx.moveTo(e.pageX , e.pageY )
        }

        
    }
    mouseUpHandler(e) {
        this.mouseDown = false
        this.inputRef.current.focus()
    }
    mouseDownHandler(e) {
        this.currentX = e.pageX 
        this.currentY = e.pageY 
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY)
        this.ctx.font='18px Arial'
        this.inputRef.current.style.left = this.currentX +'px'
        this.inputRef.current.style.top = this.currentY +'px'
        this.saved = this.canvas.toDataURL()     
    }

    mouseLeaveHandler(e) {
        if(this.mouseDown){
        this.currentX = e.pageX - e.target.offsetLeft
        this.currentY = e.pageY - e.target.offsetTop
        this.inputRef.current.style.left = this.currentX +'px'
        this.inputRef.current.style.top = this.currentY +'px'
        }
        
    }
    

    draw(text) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function(){
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY)
            this.ctx.fillText(text, this.currentX, this.currentY);
            this.inputRef.current.value = '' 
        } 
    }

    static staticDraw(ctx, text, x, y, fontSize, color){
            ctx.fillStyle  = color
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.font=`${ fontSize }px Arial`
            ctx.fillText(text ,x -60 , y -41);
    }

}