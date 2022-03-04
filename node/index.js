const express = require('express')
const util = require('util')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

let sql = `CREATE TABLE IF NOT EXISTS people(
    name varchar(255)
)`
connection.query(sql)

sql = `INSERT INTO people(name) values('Giovanni Cruz')`
connection.query(sql)
connection.end()


app.get('/', async (req, res) => {
    const connection = mysql.createConnection(config)
    const query = util.promisify(connection.query).bind(connection)
    const results = await query(`SELECT * FROM people`)
    const list = `
            <ul>
            ${results.map(result => `<li>${result.name}</li>`)}
            </ul>
        `.replaceAll(',', '')
    connection.end()
    res.send(`
            <h1>Full Cycle</h1>
            ${list}
        `)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})