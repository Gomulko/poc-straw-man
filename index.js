const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [
    {
        id: uuidv4(),
        name: 'bob',
        favoriteColor: 'red',
        timestamp: 1639996342089
     },
    {
        id: uuidv4(),
        name: 'bob',
        favoriteColor: 'green',
        timestamp: 1639996383375
    },
    {
        id: uuidv4(),
        name: 'bob',
        favoriteColor: 'blue',
        timestamp: 1639996391251
    }
]
const groups = [
    {
        id: uuidv4(),
        name: 'red-group',
        usersIds: [],
     },
    {
        id: uuidv4(),
        name: 'blue-group',
        usersIds: [],
    },
    {
        id: uuidv4(),
        name: 'yellow-group',
        usersIds: [],
    }
]

app.post("/users", (req, res) => {
    const id = uuidv4();
    const timestamp = Date.now();
    const user = {...req.body, id, timestamp};
    users.push(user)
    return res.json({user})
});

app.get("/users", (req, res) => {
    res.send(users)
});

app.get("/users/recent", (req, res) => {
    res.send(users.slice(-1))
});

app.get("/groups", (req, res) => {
    res.send(groups)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });