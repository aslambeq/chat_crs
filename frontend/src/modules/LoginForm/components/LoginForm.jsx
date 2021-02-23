import React from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import { Button } from 'components'
import { Link } from 'react-router-dom'
import { validateField } from 'utils/helpers'

const LoginForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
    isSubmitting
  } = props

  return (
    <div>
      <div className='auth__top'>
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </div>
      <Form className='login-form' onSubmit={handleSubmit}>
        <Form.Item
          validateStatus={validateField('email', touched, errors)}
          help={!touched.email ? null : errors.email}
          hasFeedback
        >
          <Input
            id='email'
            prefix={<MailOutlined className='site-form-item-icon' />}
            size='large'
            type='email'
            placeholder='E-mail'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          validateStatus={validateField('password', touched, errors)}
          help={!touched.password ? null : errors.password}
          hasFeedback
        >
          <Input
            id='password'
            prefix={<LockOutlined className='site-form-item-icon' />}
            size='large'
            type='password'
            placeholder='Пароль'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item>
          {dirty && !isValid && <span>error</span>} {/* hueta */}
          <Button onClick={handleSubmit} type='primary' size='large'>
            Войти в аккаунт
          </Button>
        </Form.Item>

        <Link className='auth__register-link' to='/register'>
          Зарегистрироваться
        </Link>
      </Form>
    </div>
  )
}

export default LoginForm
