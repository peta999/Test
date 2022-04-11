const mqtt = require('mqtt')
const mysql = require('mysql');
const { TIMESTAMP } = require('mysql/lib/protocol/constants/types');
const client = mqtt.connect('mqtt://192.168.2.80:1883')
const topic = "data"


var con = mysql.createConnection({
    host: "192.168.2.80:3306",
    user: "sqluser",
    password: "password",
    database: "gewaechshaus"
  });

 

client.on('message', (topic, message)=>{    
    console.log(message.toString());
    var data_array = message.toString().split(",")
    var sql = "INSERT INTO messungen (temperature, humidity, time) VALUES ('" + data_array[0] +"', '" + data_array[1] +"', '" + data_array[2] + "')"
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

});
client.on('connect', ()=>{
    client.subscribe(topic);
});
