const mqtt = require('mqtt')
const Datastore = require('nedb')
const client = mqtt.connect('mqtt://192.168.2.54:1883')
const topic = "data"

const database = new Datastore('database.db')
database.loadDatabase()


client.on('message', (topic, message)=>{    
    console.log(message.toString());    
});
client.on('connect', ()=>{
    client.subscribe(topic);
});
