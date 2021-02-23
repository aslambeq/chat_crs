import React from 'react'
import PropTypes from 'prop-types'
import readSVG from 'assets/img/read.svg'
import nonreadSVG from 'assets/img/nonread.svg'

const UnreadMessageIcon = ({ isMe, isRead }) =>
  isMe &&
  (isRead ? (
    <img className='message__icon-read' src={readSVG} alt='read icon' />
  ) : (
    <img
      className='message__icon-read message__icon-read--non'
      src={nonreadSVG}
      alt='nonread icon'
    />
  ))

UnreadMessageIcon.propTypes = {
  isMe: PropTypes.bool,
  isRead: PropTypes.bool
}

export default UnreadMessageIcon
