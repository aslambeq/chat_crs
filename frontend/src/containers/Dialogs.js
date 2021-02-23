import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { dialogsActions } from 'redux/actions'
import { Dialogs as BaseDialogs } from 'components'

const Dialogs = ({
  fetchDialogs,
  currentDialogId,
  setCurrentDialogId,
  items,
  userId
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [filteredItems, setFilteredItems] = useState(Array.from(items))

  const onChangeInput = value => {
    setFilteredItems(
      items.filter(
        dialog =>
          dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    )
    setSearchValue(value)
  }

  useEffect(() => {
    if (!items.length) {
      fetchDialogs()
    } else {
      setFilteredItems(items)
    }
  }, [items])

  return (
    <BaseDialogs
      userId={userId}
      items={filteredItems}
      onSearch={onChangeInput}
      inputValue={searchValue}
      onSelectDialog={setCurrentDialogId}
      currentDialogId={currentDialogId}
    />
  )
}

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs)
