class ServerController {
    constructor(io, rabbitMq) {
        this.io = io
        this.messages = []
        this.rabbitMq = rabbitMq
    }
    running(req, res) {
        res.send('server is running')
    }
    findHtml(req, res) {
        res.sendFile(__basedir + '/src/index.html')//Busca o arquivo HTML
    }
    onConnect(socket) {
        console.log(socket.id)
        socket.emit('previousMessage', this.messages)
        socket.on('sendMessage', data => {
        this.messages.push(data)
        this.rabbitMq.sendToQueue(this.rabbitMq.channel, data)
            if(data.sendTo){
                this.io.to(data.sendTo).emit('receivedMessage', data)
            }
            else{
                socket.broadcast.emit('receivedMessage', data)
            }
            console.log(data)
        })
    }
}

module.exports = ServerController