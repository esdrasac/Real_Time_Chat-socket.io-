global.__basedir = __dirname

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const Route = require('./src/routes/route.js')
const RabbitMq = require('./src/controllers/rabbitMq')
const rabbitMq = new RabbitMq()
const route = new Route(http, io, app, rabbitMq)


rabbitMq.getConnection()

route.listen()

http.listen(1111,() => {
    console.log('server on *3333')
})