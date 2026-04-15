import { TextField, Button, Stack } from '@mui/material'
import { useField } from '../hooks'

const Login = ({ handleLogin }) => {
  const { reset:resetUsername, ...username } = useField('text')
  const { reset:resetPassword, ...password } = useField('password')

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        await handleLogin(username.value, password.value)
        resetUsername()
        resetPassword()
      }}
    >
      <div>
        <h2>Log in to application</h2>
        <Stack spacing={2} sx={{ width: '300px' }}>
          <TextField
            label='username'
            {...username}
          />
          <TextField
            label='password'
            {...password}
          />
        </Stack>
      </div>
      <Button type='submit' variant='contained' style={{ marginTop: 10 }}>
        login
      </Button>
    </form>
  )
}

export default Login
