import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin, setError } from '../../store/actions/authActions'
import { RootState } from '../../store'
import { Button, Form, Input } from 'antd'

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()
  const { error } = useSelector((state: RootState) => state.auth)

  React.useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''))
      }
    }
  }, [error, dispatch])

  const submitHandler = () => {
    if (error) {
      dispatch(setError(''))
    }
    setLoading(true)
    dispatch(signin({ email, password }, () => setLoading(false)))
  }
  return (
    <Form onFinish={submitHandler}>
      {error && <span>{error}</span>}
      <Input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        placeholder="Email address"
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="Password"
      />
      <Button disabled={loading} htmlType="submit">
        {loading ? 'Loading...' : 'Sign In'}
      </Button>
    </Form>
  )
}

export default SignIn
