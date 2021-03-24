import mongoose from 'mongoose'
import express from 'express'
// import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import {
  UserController,
  DialogController,
  MessageController
} from './controllers'

import { updateLastSeen, checkAuth } from './middlewares'

// app init, dotenv
const app = express()
dotenv.config()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// bodyParser deprecated
// app.use(bodyParser.json())

app.use(updateLastSeen)
app.use(checkAuth)

// controllers
const User = new UserController()
const Dialog = new DialogController()
const Message = new MessageController()

// mongoose
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
app.post('/user/login', User.login)

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
  console.log(`Server listening at http://localhost:${port}`)
})
