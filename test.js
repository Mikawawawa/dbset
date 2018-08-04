const Dbset = require("./index")

let config = {
    host: "101.132.116.211",
    user: "root",
    password: "aptx4869",
    database: "fpsign",
}

var database = new Dbset(config)

database.connect()

database.select({
    table: "list",
    condition: {
        name: "姜佐腾"
    }
}, function (data) {
    console.log(data)
})

// database.delete({
//     table: "list",
//     condition: {
//         id: 190
//     }
// })

database.insert({
    table: "list",
    value: {
        id: 190,
        machine: 1,
        user: '001',
        room: '254',
        building: '��2����¥',
        name: '88',
        sid: 'q',
        date: '2018-3-23',
        time: '22:8:10',
        type: 1
    }
})

// database.list()

// database.disconnect()