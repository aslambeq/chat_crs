import React from 'react'
import { Form, Input } from 'antd'
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  InfoCircleTwoTone
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { Button, Block } from 'components'
import { validateField } from 'utils/helpers'

const RegisterForm = props => {
  const success = false

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
        <h2>Регистрация</h2>
        <p>Для входа в чат вам нужно зарегистрироваться</p>
      </div>
      <Block>
        {!success ? (
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

            <Form.Item>
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                size='large'
                type='user'
                placeholder='Ваше имя'
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

            <Form.Item
              validateStatus={validateField('password', touched, errors)}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                size='large'
                type='password'
                placeholder='Повторите пароль'
              />
            </Form.Item>

            <Form.Item>
              {dirty && !isValid && <span>error</span>} {/* hueta */}
              <Button onClick={handleSubmit} type='primary' size='large'>
                Зарегистрироваться
              </Button>
            </Form.Item>

            <Link className='auth__register-link' to='/login'>
              Войти в аккаунт
            </Link>
          </Form>
        ) : (
          <div className='auth__success-block'>
            <div>
              <InfoCircleTwoTone />
            </div>
            <h2>Подтвердите свой аккаунт</h2>
            <p>
              На вашу почту отправлено письмо с ссылкой на подтверждение
              аккаунта
            </p>
          </div>
        )}
      </Block>
    </div>
  )
}

export default RegisterForm
