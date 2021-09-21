const express = require('express');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`App listen on port ${PORT}`)
})



