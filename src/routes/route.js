const ServerController = require('../controllers/serverController')

class Route{
    constructor(server, io, app, rabbitMq){
        this.server = server
        this.io = io
        this.app = app

        this.serverController = new ServerController(this.io, rabbitMq)
    }

    middler() {
        // Express server
        this.app.get('/', this.serverController.findHtml)

        this.io.on('connection', this.serverController.onConnect.bind(this.serverController))
    }

    listen() {
        this.middler()
    }
}

module.exports = Route