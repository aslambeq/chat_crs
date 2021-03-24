import express from 'express'
import { UserModel } from '../models'
import { IUser } from '../models/User'
import { createJWT } from '../utils'

class UserController {
  show(req: express.Request, res: express.Response) {
    const id: string = req.params.id

    // FIXME any
    UserModel.findById(id, (err: any, user: any) => {
      if (err) {
        return res.status(404).json({
          message: 'User not found'
        })
      }

      res.json(user)
    })
  }

  getMe() {
    // TODO make getMe() method (authentication)
  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password
    }

    const user = new UserModel(postData)
    user
      .save()
      .then((obj: any) => {
        console.log('test user created')
        res.json(obj)
      })
      .catch((err: any) => {
        return res.json(err)
      })
  }

  login(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.login,
      password: req.body.password
    }

    // FIXME any
    UserModel.findOne({ email: postData.email }, (err: any, user: IUser) => {
      if (err) {
        return res.status(404).json({
          message: 'User not found'
        })
      }

      if (user.password === postData.password) {
        const token = createJWT(user)

        res.json({
          status: 'success',
          token
        })
      } else {
        res.json({
          status: 'error',
          message: 'Incorrect credentials'
        })
      }
    })
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id

    UserModel.findOneAndDelete({ _id: id })
      .then(user => {
        if (user) {
          res.json({
            message: `User '${user.fullname}' deleted`
          })
        }
      })
      .catch(() =>
        res.status(404).json({
          message: 'User not found'
        })
      )
  }
}

export default UserController
