import { axios } from 'core'

export default {
  getAllByDialogId: dialogId => axios.get(`/messages?dialog=${dialogId}`)
}
