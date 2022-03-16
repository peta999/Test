const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})

server.on('message', (package)=> {
  console.log(package.toString())
})
server.on('published', (package)=> {
    console.log(package.toString())
})
server.on('publish', async function (packet, client) {
  if (client) {
      console.log("test")
  }
})

