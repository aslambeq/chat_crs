export default (key, touched, errors) => {
  /* 1st variant */
  // if (touched[key] && errors[key]) {
  //   return 'error'
  // } else if (!touched[key]) {
  //   return ''
  // } else {
  //   return 'success'
  // }

  if (touched[key]) {
    if (errors[key]) {
      return 'error'
    } else {
      return 'success'
    }
  } else {
    return ''
  }
}
