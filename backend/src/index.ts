import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

import { UserModel } from './models'
import { UserController } from './controllers'

const app = express()
const port = 3001

app.use(bodyParser.json())

const User = new UserController()

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.get('/user/:id', User.show)
app.delete('/user/:id', User.delete)
app.post('/user/register', User.create)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
