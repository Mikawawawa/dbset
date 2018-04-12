const mysql = require('mysql');

class EasySql {
    constructor(config) {
        if (config) {
            this.connection = mysql.createConnection(config)
        } else {
            throw new Error("There is a trouble occured as there aren't enough params")
        }
    }

    connect() {
        this.connection.connect()
    }

    disconnect() {
        this.connection.end()
    }

    getType(param) {
        if (typeof (param) == "string" || typeof (param) == "number") {
            return typeof (param)
        } else {
            return param.constructor.name
        }
    }

    condition(condition) {
        var str = []
        for (let key in condition) {
            if (typeof (condition[key] == "string")) {
                str.push(`\`${key}\` LIKE '${condition[key]}'`)
            } else if (typeof (condition[key] == "number")) {
                str.push(`\`${key}\` = ${condition[key]}`)
            }
        }
        return str.join(" ")
    }

    select(config, callback) {
        let table = config.table,
            _condition = config.condition ? config.condition : '',
            _order = config.order ? config.order : ''

        let condition = _condition !== '' ? `WHERE ${this.condition(_condition)}` : ''
        console.log(condition)

        let order = _order !== '' ? `ORDER BY \`${table}\`.\`${_order.key}\` ${_order.type}` : ''

        let sql = `SELECT * FROM \`${table}\` ${condition} ${order}`

        var data = undefined

        this.connection.query({
            sql: sql
        }, (error, data, field) => {
            if (!error)
                callback(JSON.parse(JSON.stringify(data)))
            else
                throw error
        })
    }
}

module.exports = EasySql