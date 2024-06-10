
const express = require('express')
const parser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

// Body Parser Middleware
app.use(express.json())

/* BEGIN - create routes here */

app.use((req, res, next) => {
  next()
})

// GET all users. Usually known as "get all"
app.get('/users', (req, res) => {
  res.json(users)
})

// GET just one user by id. Usually known as "get one"
app.get('/users/:id', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.id))
  if (found) {
    res.json(users.filter(user => user._id === parseInt(req.params.id)))
  }
  else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}`})
  }
})

// the POST Method
app.post('/users', (req, res) => {
  let counter = users.length
  console.log(req.body)
  let newUser = {
    id: counter += 1,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }
  if (!newUser.name || !newUser.occupation || !newUser.avatar) {
    return res.status(400).json({ msg: "Please include a name, occupation, and avatar"})
  }
  users.push(newUser)
  res.json(newUser)
})

// the PUT Method
app.put('/users/:id', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.id))
  if (found) {
    let updMember = req.body
    users.forEach(user => {
      if (user._id == parseInt(req.params.id)) {
        if (updMember.name) {
          user.name = updMember.name
        }
        if (updMember.occupation) {
          user.occupation = updMember.occupation
        }
        if (updMember.avatar) {
          user.avatar = updMember.avatar
        }
      }
      res.json({ msg: 'User Update', user})
    })
  }
  else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}`})
  }
})

// the DELETE Method
app.delete('/users/:id', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.id))
  const userId = req.params.id
  if (found) {
    users[userId - 1].isActive = false
    res.json({
      msg: "User Deleted",
      users: users.filter(user => user._id !== parseInt(req.params.id))
    })
  }
  else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}`})
  }
})


/* END - create routes here */
app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))