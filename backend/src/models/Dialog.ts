import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './User'

interface IDialog extends Document {
  author: IUser | string
  partner: IUser | string
  lastMessage: string
}

const DialogSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: 'dsada' },
    partner: { type: Schema.Types.ObjectId, ref: 'User', required: 'dsadas' },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' } // contains message id
  },
  {
    timestamps: true
  }
)

const DialogModel = mongoose.model<IDialog>('Dialog', DialogSchema)

export default DialogModel
