import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import LinkedText from './LinkedText'

const UserList = ({ users }) => {
  return(
    <div>
      <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 2 }}>Users</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map(user => (
              <TableRow
                key={user.id}
              >
                <TableCell>
                  <LinkedText
                    link={`/users/${user.id}`}
                    text={user.name} />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList