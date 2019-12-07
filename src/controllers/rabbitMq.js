const amqp = require('amqplib')

class RabbitMQ{
    constructor(){
        this.queue = 'chat'
        this.channel = null
    }


     connect(url = 'amqp://guest:guest@tup02hml011:5672'){
        return new Promise((resolve, reject) => {
            amqp.connect(url)
                .then(connection => resolve(connection))
                .catch(err => reject(err))
        })
    }

    createChannel(connection){
        return new Promise((resolve, reject) => {
            connection.createChannel()
                .then(channel => resolve(channel))
                .catch(err => reject(err))
        })
    }

    channelAssertQueue(channel){
        return new Promise((resolve, reject) => {
            channel.assertQueue(this.queue)
                .then(asserted => resolve(channel))
                .catch(err => reject(err))
        })
    }

    sendToQueue(channel, msg){ 
            channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(msg)))
            console.log('[x] Sent %s', msg)
    }

    async getConnection(){
        let connection = await this.connect()
        this.channel = await this.createChannel(connection)
        //let assertedChannelToQueue = await this.channelAssertQueue(this.channel, this.queue)
    }
}
module.exports = RabbitMQ