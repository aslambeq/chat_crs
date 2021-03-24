import jwt from 'jsonwebtoken'

/* verify(token) ? then do smth : catch error */
export default (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET || '', (err, decodedData) => {
      if (err || !decodedData) {
        return reject(err)
      }

      resolve(decodedData)
    })
  })
}
