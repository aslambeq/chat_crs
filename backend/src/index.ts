import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

import {
  UserController,
  DialogController,
  MessageController
} from './controllers'

const app = express()
const port = 3001

app.use(bodyParser.json())

const User = new UserController()
const Dialog = new DialogController()
const Message = new MessageController()

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

/* User */
app.get('/user/:id', User.show)
app.delete('/user/:id', User.delete)
app.post('/user/register', User.create)

/* Dialogs */
// get user's dialogs by author id
app.get('/dialogs', Dialog.index)

app.delete('/dialogs/:id', Dialog.delete)
app.post('/dialogs', Dialog.create)

/* Messages */
app.get('/messages', Message.index)
app.delete('/messages/:id', Message.delete)
app.post('/messages', Message.create)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
