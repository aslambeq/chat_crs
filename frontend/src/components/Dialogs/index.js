import React from 'react'
import { Input, Empty } from 'antd'
import orderBy from 'lodash/orderBy'

import { DialogItem } from '../'

import './Dialogs.scss'

const { Search } = Input

const Dialogs = ({
  items,
  userId,
  onSearch,
  inputValue,
  currentDialogId,
  onSelectDialog
}) => {
  return (
    <div className='dialogs'>
      <div className='dialogs__search'>
        <Search
          placeholder='Поиск среди контактов'
          allowClear
          onChange={e => onSearch(e.target.value)}
          value={inputValue}
        />
      </div>

      {items.length ? (
        orderBy(items, 'created_at', 'desc').map(msg => {
          return (
            <DialogItem
              onSelect={onSelectDialog}
              key={msg._id}
              isMe={msg.user._id === userId}
              currentDialogId={currentDialogId}
              {...msg}
            />
          )
        })
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Не найдено' />
      )}
    </div>
  )
}

export default Dialogs
