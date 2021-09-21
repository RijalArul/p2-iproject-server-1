const express = require('express');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require('./routes/index');

app.use(routes)

app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
})



