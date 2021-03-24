import jwt from 'jsonwebtoken'
import _ from 'lodash'

interface ILoginData {
  email: string
  password: string
}

export default (user: ILoginData) => {
  let token = jwt.sign(
    {
      // create User Object w/o password key using _.reduce
      data: _.reduce(
        user,
        // FIXME any
        (result: any, value, key) => {
          if (key !== 'password') {
            result[key] = value
          }
          console.log('createJWT result', result)
          return result
        },
        {}
      )
    },
    process.env.JWT_SECRET || '',
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: 'HS256'
    }
  )

  return token
}
