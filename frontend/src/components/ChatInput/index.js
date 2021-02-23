import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from 'antd'
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined
} from '@ant-design/icons'
import { UploadField } from '@navjobs/upload'
import { Picker } from 'emoji-mart'

import './ChatInput.scss'

const ChatInput = props => {
  const [inputValue, setInputValue] = useState('')
  const [emojiPickerVisible, setEemojiPickerVisible] = useState(false)

  const toggleEmojiPicker = () => {
    setEemojiPickerVisible(!emojiPickerVisible)
  }

  return (
    <div className='chat-input'>
      <Input
        size='large'
        placeholder='Введите текст сообщения'
        onChange={e => setInputValue(e.target.value)}
        prefix={
          <div className='chat-input__smile-btn'>
            {emojiPickerVisible && (
              <div
                className='chat-input__emoji-picker'
                // onMouseEnter={() => setEemojiPickerVisible(true)}
                // onMouseLeave={() => setEemojiPickerVisible(false)}
              >
                <Picker set='apple' />
              </div>
            )}
            <Button
              onClick={toggleEmojiPicker}
              // onMouseEnter={() => setEemojiPickerVisible(true)}
              // onMouseLeave={() => setEemojiPickerVisible(false)}
              type='link'
              shape='circle'
              icon={<SmileOutlined />}
            />
          </div>
        }
        suffix={
          <div className='chat-input__actions'>
            <Button
              type='link'
              shape='circle'
              icon={
                /* TODO react-dropzone.js */
                <UploadField
                  onFiles={files => console.log(files)}
                  containerProps={{
                    className: 'chat-input__actions-upload-btn'
                  }}
                  uploadProps={{
                    accept: '.jpg,.jpeg,.png,.gif,.bmp',
                    multiple: 'multiple'
                  }}
                >
                  <CameraOutlined />
                </UploadField>
              }
            />

            {inputValue ? (
              <Button
                type='link'
                shape='circle'
                icon={<SendOutlined style={{ color: '#40a9ff' }} />}
              />
            ) : (
              <Button type='link' shape='circle' icon={<AudioOutlined />} />
            )}
          </div>
        }
      />
    </div>
  )
}

ChatInput.propTypes = {
  className: PropTypes.string
}

export default ChatInput
