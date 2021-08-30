import { makeAutoObservable } from 'mobx';

class ToolState {
    tool = null
    text = ''
    width = 1
    fontSize = ''
    strokeColor = ''
    fillColor = ''
    constructor () {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
    }

   
    setFillColor(color) {
        this.fillColor = color
        if(this.tool){
            this.tool.setFillColor(color)
        }
        
    }

    setStrokeColor(color) {
        this.strokeColor = color
        if(this.tool){
            this.tool.setStrokeColor(color) 
        }
    }

    setLineWidth(width) {
        this.width = width
        this.tool.setLineWidth(width)
    }
    setFontSize(size) {
        if(this.tool){
            this.fontSize = size
            this.tool.setFontSize(size)
        }
        
    }

    getName(){
        if(this.tool){
            return this.tool.getName
        }
        return null  
    }


}

export default new ToolState()