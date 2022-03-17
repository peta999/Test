const mqtt = require('mqtt')
const mysql = require('mysql');
const client = mqtt.connect('mqtt://192.168.2.54:1883')
const topic = "data"


client.on('message', (topic, message)=>{    
    console.log(message.toString());    
});
client.on('connect', ()=>{
    client.subscribe(topic);
});
