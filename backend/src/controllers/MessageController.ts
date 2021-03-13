import express from 'express'
import { MessageModel } from '../models'

class MessageController {
  index(req: express.Request, res: express.Response) {
    // FIXME any
    const dialogId: any = req.query.dialog

    MessageModel.find({ dialog: dialogId })
      .populate(['dialog'])
      .exec((err, messages) => {
        if (err) {
          return res.status(404).json({
            message: 'Messages not found'
          })
        }

        return res.json(messages)
      })
  }

  create(req: express.Request, res: express.Response) {
    // mock dialogId 604cdf026bce990a17c3bcf5
    // mock userId
    const userId = '6038dd4fb303a6466a0c68d1'

    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      user: userId
    }

    const message = new MessageModel(postData)

    message
      .save()
      .then((obj: any) => {
        res.json(obj)
      })
      .catch((err: any) => {
        return res.json(err)
      })
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id

    MessageModel.findOneAndDelete({ _id: id })
      .then(message => {
        if (message) {
          res.json({
            message: `Message deleted`
          })
        }
      })
      .catch(() =>
        res.status(404).json({
          message: 'Message not found'
        })
      )
  }
}

export default MessageController
