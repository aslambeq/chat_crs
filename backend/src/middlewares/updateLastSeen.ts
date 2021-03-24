import express from 'express'
import { UserModel } from '../models'

export default (
  _: express.Request,
  __: express.Response,
  next: express.NextFunction
) => {
  console.log('update last_seen')
  UserModel.findOneAndUpdate(
    { _id: '6038dd4fb303a6466a0c68d1' },
    { last_seen: new Date() },
    { new: true },
    () => {}
  )

  next()
}
