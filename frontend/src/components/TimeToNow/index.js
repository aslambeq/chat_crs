import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru'

const TimeToNow = ({ date }) => (
  <Fragment>
    {formatDistanceToNow(date, {
      addSuffix: true,
      locale: ruLocale
    })}
  </Fragment>
)

TimeToNow.propTypes = {
  // FIXME date prop type
  // date: PropTypes.string
}

export default TimeToNow
