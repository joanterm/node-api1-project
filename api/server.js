// BUILD YOUR SERVER HERE
const express = require("express")
const server = express()
server.use(express.json()) //post + put requests//req.body

const {
    find,
    findById,
    insert,
    update,
    remove,
    resetDB
} = require("./users/model")

//GET
server.get("/api/users", (req, res) => {
    find()
    .then((result) => {
        // if(result == null) {
        //     res.status(500).json({message: "The users information could not be retrieved"})
        // } else {
        //     res.json(result)
        // }
        res.json(result)
    })
    .catch(() => {
        res.status(500).json({message: "The users information could not be retrieved"})
    })
})

//GET by id
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    findById(id)
    .then((result) => {
        if(!result) {
            res.status(404).json({message: "The user with the specified ID does not exist"})           
        } else {
            res.json(result)
        }
    })
})

//POST
server.post("/api/users", (req, res) => {
    insert(req.body)
    .then((result) => {
        if(!result.name || !result.bio) {
            res.status(400).json({message: "Please provide name and bio for the user"})
        } else {
            res.status(201).json(result)
        }
    })
    .catch(() => {
        res.status(500).json({message: "There was an error while saving the user to the database"})
    })
})

//PUT
server.put("/api/users/:id", (req, res) => {
    update(req.params.id, req.body)
    .then((result) => {
        if(!result) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else if(!result.name || !result.bio) {
            res.status(400).json({message: "Please provide name and bio for the user"})
        } else {
            res.json(result)
        }
    })
    .catch(() => {
        res.status(500).json({message: "The user information could not be modified"})
    })
})

//DELETE
server.delete("/api/users/:id", (req, res) => {
    remove(req.params.id)
    .then((result) => {
        if(!result) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
        } else {
            res.json(result)
        }
    })
    .catch(() => {
        res.status(500).json({message: "The user could not be removed"})
    })
})

// If the user with the specified id is not found:

// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist" }.
// If there's an error in removing the user from the database:

// respond with HTTP status code 500.
// return the following JSON object: { message: "The user could not be removed" }.


module.exports = server // EXPORT YOUR SERVER instead of {}
