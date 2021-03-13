import mongoose, { Schema, Document } from 'mongoose'

interface IMessage extends Document {
  text: {
    type: string
    required: boolean
  }
  unread: {
    type: boolean
    default: boolean
  }
  dialog: { type: Schema.Types.ObjectId; ref: string; required: boolean }
}

// TODO attachments
const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    unread: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema)

export default MessageModel
