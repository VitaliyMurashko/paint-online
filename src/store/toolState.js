import { makeAutoObservable } from 'mobx';

class ToolState {
    tool = null
    constructor () {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
    }

    setColor(color){
        if(this.tool){
         this.tool.ctx.fillStyle = color
         this.tool.ctx.strokeStyle = color
        }
    }


}

export default new ToolState()