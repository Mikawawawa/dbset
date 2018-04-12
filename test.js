const Db = require("./index")

let config = {
    host: "101.132.116.211",
    user: "root",
    password: "aptx4869",
    database: "fpsign",
}

var database = new Db(config)

database.connect()

database.select({
    table: "list",
    condition: {
        name: "姜佐腾"
    }
}, function (data) {
    console.log(data)
})

database.disconnect()