import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Emoji } from 'emoji-mart'

import { convertCurrentTime } from 'utils/helpers'

import waveSVG from 'assets/img/wave.svg'
import playSVG from 'assets/img/play.svg'
import pauseSVG from 'assets/img/pause.svg'

import { TimeToNow, UnreadMessageIcon, Avatar } from 'components'

import './Message.scss'

// #6 - 2:14:28
const MessageAudio = ({ audioSrc }) => {
  let audioEl = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const togglePlay = () => {
    if (!isPlaying) {
      audioEl.current.play()
    } else if (isPlaying) {
      audioEl.current.pause()
    }
  }

  useEffect(() => {
    audioEl.current.volume = '0.1'
    audioEl.current.addEventListener(
      'playing',
      () => {
        setIsPlaying(true)
      },
      false
    )
    audioEl.current.addEventListener(
      'pause',
      () => {
        setIsPlaying(false)
      },
      false
    )
    audioEl.current.addEventListener(
      'ended',
      () => {
        setIsPlaying(false)
        setProgress(0)
        setCurrentTime(0)
      },
      false
    )
    audioEl.current.addEventListener('timeupdate', () => {
      const duration = (audioEl.current && audioEl.current.duration) || 0
      setCurrentTime(audioEl.current.currentTime)
      // FIXME progress bar
      setProgress((audioEl.current.currentTime / duration) * 100)
    })
    // audioEl.current.addEventListener('loadedmetadata', () => {
    //   setCurrentTime(audioEl.current.duration)
    // })
  }, [])

  return (
    <div className='message__audio'>
      <audio ref={audioEl} src={audioSrc} preload='auto'></audio>
      <div
        className='message__audio-progress'
        style={{ width: `${progress}%` }}
      ></div>
      <div className='message__audio-info'>
        <div className='message__audio-btn'>
          <button onClick={togglePlay}>
            {isPlaying ? (
              <img src={pauseSVG} alt='pause svg' />
            ) : (
              <img src={playSVG} alt='play svg' />
            )}
          </button>
        </div>
        <div className='message__audio-wave'>
          <img src={waveSVG} alt='wave svg' />
        </div>
        <span className='message__audio-duration'>
          {convertCurrentTime(currentTime)}
        </span>
      </div>
    </div>
  )
}

const Message = ({
  avatar,
  user,
  text,
  date,
  audio,
  isMe,
  isRead,
  attachments,
  isTyping
}) => {
  return (
    <div
      className={classNames('message', {
        'message--isMe': isMe,
        'message--is-typing': isTyping,
        'message--is-audio': audio,
        'message--image': attachments && attachments.length === 1
      })}
    >
      <div className='message__content'>
        {/* <UnreadMessageIcon isMe={isMe} isRead={isRead} /> */}

        <div className='message__avatar'>
          <Avatar user={user} />
        </div>
        <div className='message__info'>
          {(audio || text || isTyping) && (
            <div className='message__bubble'>
              {/* {text && <p className='message__text'>{text}</p>} */}
              {text && (
                <p className='message__text'>
                  <Emoji emoji=':santa::skin-tone-3:' set='apple' size={16} />
                </p>
              )}
              {isTyping && (
                <div className='message__typing'>
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {audio && <MessageAudio audioSrc={audio} />}
            </div>
          )}

          {attachments && (
            <div className='message__attachments'>
              {attachments.map((item, idx) => (
                <div key={idx} className='message__attachments-item'>
                  <img src={item.url} alt={item.filename} />
                </div>
              ))}
            </div>
          )}

          {date && (
            <span className='message__date'>
              <TimeToNow date={date} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

Message.defaultProps = {
  user: {}
}

Message.propTypes = {
  avatar: PropTypes.string,
  user: PropTypes.object,
  text: PropTypes.string,

  // FIXME date prop type
  // date: PropTypes.string,

  audio: PropTypes.string,
  isMe: PropTypes.bool,
  isRead: PropTypes.bool,
  attachments: PropTypes.array,
  isTyping: PropTypes.bool
}

export default Message
