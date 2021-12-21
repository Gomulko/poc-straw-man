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
        name: 'Bob',
        favoriteColor: 'red',
        timestamp: 1639996342089
     },
    {
        id: uuidv4(),
        name: 'Tom',
        favoriteColor: 'green',
        timestamp: 1639996383375
    },
    {
        id: uuidv4(),
        name: 'Jon',
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
        name: 'green-group',
        usersIds: [],
    },
    {
        id: uuidv4(),
        name: 'blue-group',
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

app.delete("/groups/:id/removeUser", (req, res) => {
    const removeUser = {...req.body};
    const selectedGroup = groups.filter(e => e.id == req.params.id);
    const item = selectedGroup[0].usersIds.indexOf(removeUser.id);
    if (item > -1) {
        selectedGroup[0].usersIds.splice(item, 1);
    }
    return res.json({removeUser})
});

app.post("/groups/:id/addUser", (req, res) => {
    const newUser = {...req.body};
    const selectedGroup = groups.filter(e => e.id == req.params.id);
    selectedGroup[0].usersIds.push(newUser.id);
    return res.json({newUser})
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