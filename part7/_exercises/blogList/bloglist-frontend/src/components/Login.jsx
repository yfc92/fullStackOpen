import { useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        await handleLogin(username, password)
        setUsername('')
        setPassword('')
      }}
    >
      <div>
        <h2>Log in to application</h2>
        <Stack spacing={2} sx={{ width: '300px' }}>
          <TextField
            label='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            type='password'
            label='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
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
