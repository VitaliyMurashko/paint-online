import { makeAutoObservable} from 'mobx';
class CanvasState {
    canvas = null
    socket = null
    sessionId = ''
    clientsList = []
    undoList = []
    redoList = []
    username = ''
    systemMessage = {}

    constructor () {
        makeAutoObservable(this)
    }

    setUsername(username){
        this.username = username
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    setSocket(socket) {
        this.socket = socket
    }

    setSessionId(Id) {
        this.sessionId = Id
    }

    setClientsList(clients) {
        this.clientsList = clients
    }

    setSystemMessage(msg) {
        this.systemMessage = msg
    }

    pushToUndo(data){
        this.undoList.push(data)
    }

    pushToRedo(data){
        this.redoList.push(data)
    }

    undo(){
        let ctx = this.canvas.getContext('2d')
        if(this.undoList.length > 0) {
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    
    redo(){
        let ctx = this.canvas.getContext('2d')
        if(this.redoList.length > 0) {
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }

    }

    clear(){
        let ctx = this.canvas.getContext('2d')
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.undoList = []
        this.redoList = []
    }
}

export default new CanvasState()