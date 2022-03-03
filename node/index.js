const express = require('express')
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


app.get('/', (req, res) => {
    res.send('<h1>Full Cycle</h1>')
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})