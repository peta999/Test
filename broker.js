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

'use strict'
 
var fs = require('fs')
var path = require('path')
var http = require('http')
var https = require('https')
var websocket = require('websocket-stream')
var net = require('net')
var tls = require('tls')
var logging = require('aedes-logging')
var instance = aedes()
 
var servers = [
  startHttp(),
  startHttps(),
  startNet(),
  startTLS()
]
 
logging({
  instance: instance,
  servers: servers
})
 
function startHttp () {
  var server = http.createServer()
  websocket.createServer({
    server: server
  }, instance.handle)
  server.listen(8880)
  return server
}
 
function startHttps () {
  var server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
  })
  websocket.createServer({
    server: server
  }, instance.handle)
  server.listen(8881)
  return server
}
 
function startNet () {
  return net.createServer(instance.handle).listen(8882)
}
 
function startTLS () {
  return tls.createServer({
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
  }, instance.handle).listen(8883)
}