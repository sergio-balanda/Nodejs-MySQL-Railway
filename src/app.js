import express from "express"
import bodyParser from 'body-parser'

import { pool } from "./db.js"
import { PORT } from "./config.js"

const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const [result] = await pool.query('SELECT * from users')
    res.status(200).json(result)
})

app.get('/ping', async (req, res) => {
    try{
        const [result] = await pool.query('SELECT "Hello world" as RESULT')
        console.log(result);
        res.json(result[0])
    }catch(err){
        console.error(err)
    }
    res.send('Welcome to your')
})

app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body
        const result = await pool.query(`SELECT * FROM users WHERE email = "${email}" and password = "${password}"`)
        console.log(result);
        res.status(200).json(result[0])
    }catch(err){
        console.error(err)
        res.status(400).json('login error', err)
    }
})

// app.get('/create', async (req, res) => {
//     try{
//         const result = await pool.query('INSERT INTO users(name,email) VALUES ("juan","juan@email.com")')
//         res.status(201).json(result)
//     }catch(err){
//         console.error(err)
//     }
//     res.status(401).json({ error: 'Error' });
// })

app.listen(PORT)
console.info("🚀 Server on port: ",PORT)