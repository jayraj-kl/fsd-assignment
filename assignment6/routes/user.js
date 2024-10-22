const express = require('express');
const users = require('../db.js');
const USER = require('../db.js');
const {v4 : uuidv4} = require('uuid');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(USER);
});

router.post('/', (req, res) => {
    const user = req.body;
    const userId = uuidv4();
    const userWithId = { ...user, id: userId };

    users.push(userWithId);
    res.send(`User with the name ${user.firstName} added to the database!`);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;  // Get the id from the URL
    const index = users.findIndex((user) => user.id == id); // Find the index of the user with the given id

    if (index !== -1) {
        users.splice(index, 1);  // Remove the user from the array
        res.send(`User with the id ${id} deleted from the database.`);
    } else {
        res.status(404).send(`User with the id ${id} not found.`);
    }
});


router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const user = users.find((user) => user.id === id);

    if (firstName) { user.firstName = firstName }
    if (lastName) { user.lastName = lastName }
    if (age) { user.age = age }

    res.send(`User with the id ${id} has been updated`);
});

module.exports = router;