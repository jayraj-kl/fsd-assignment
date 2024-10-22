const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/user", userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//write a post request

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});