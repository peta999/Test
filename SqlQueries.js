

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "password",
  database: "gewaechshaus"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO messungen (temperature, humidity, time) VALUES ('20.3', '47.3', '2002-01-10 18:17:30')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

