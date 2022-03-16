const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://192.168.2.54:1883')
const topic = "settings"
const message = "temperature: " + 20.5 + ", humidity: " + 59.3;

const options = {   
    qos: 1
};

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, message, options)
        client.publish("data", message, options)
        console.log("Message sent", message);
    }, 2500)
})