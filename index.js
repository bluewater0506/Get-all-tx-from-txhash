const express = require('express')
const cors = require('cors');

const { backtoken } = require('./controller')
const app = express()

app.use(express.json());
app.use(cors({
  origin: '*'
}));
require('dotenv').config()

const port = process.env.PORT

app.get('/', (req, res) => {res.send("good work")});

backtoken();

app.listen(port, () => {
  console.log(`Server running in port:${port}`)
})