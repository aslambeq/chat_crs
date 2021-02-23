/* import LoginForm from '../components/LoginForm'

export default LoginForm */

import { withFormik } from 'formik'
import LoginForm from '../components/LoginForm'
import validateForm from 'utils/validate'

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  // Custom sync validation
  validate: values => {
    let errors = {}

    /* validations */
    validateForm({ isAuth: true, values, errors })

    return errors
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  },

  displayName: 'Login Form' // helps with React DevTools
})(LoginForm)
