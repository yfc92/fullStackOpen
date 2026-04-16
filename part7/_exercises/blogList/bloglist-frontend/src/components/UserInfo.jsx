import BlogList from './BlogList'
import { Typography } from '@mui/material'

const UserInfo = ({ user }) => {
  if(!user) return null
  return(
    <>
      <Typography variant='h4' sx={{ fontWeight: 'bold', mt: 2 }}>{user.name}</Typography>
      <BlogList blogs={user.blogs} title='Added Blogs'/>
    </>
  )
}

export default UserInfo