import React from 'react'
import classNames from 'classnames'
import format from 'date-fns/format'
import isToday from 'date-fns/isToday'
import isThisWeek from 'date-fns/isThisWeek'

import { UnreadMessageIcon, Avatar } from '../'

const getMessageTime = created_at => {
  const date = new Date(created_at)

  if (isToday(date)) {
    return format(date, 'HH:mm')
  } else if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, 'eee')
  } else {
    return format(date, 'dd.MM.yyyy')
  }
}

const DialogItem = ({
  _id,
  user,
  unreadCounter,
  created_at,
  text,
  isMe,
  onSelect,
  currentDialogId
}) => {
  return (
    <div
      className={classNames('dialogs__item', {
        'dialogs__item--online': user.isOnline,
        'dialogs__item--selected': currentDialogId === _id
      })}
      onClick={onSelect.bind(this, _id)}
    >
      <div className='dialogs__item-avatar'>
        <Avatar user={user} />
      </div>
      <div className='dialogs__item-info'>
        <div className='dialogs__item-info-top'>
          <b>{user.fullname}</b>
          <span>
            {/* <TimeToNow date={message.created_at} /> */}

            {getMessageTime(created_at)}
          </span>
        </div>
        <div className='dialogs__item-info-bottom'>
          <p>{text}</p>

          {isMe && <UnreadMessageIcon isMe={true} isRead={true} />}
          {unreadCounter > 0 && (
            <div className='dialogs__item-info-bottom-counter'>
              {unreadCounter > 9 ? '+9' : unreadCounter}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DialogItem

/* FIXME counter classname: dialogs__item_unread-count */
