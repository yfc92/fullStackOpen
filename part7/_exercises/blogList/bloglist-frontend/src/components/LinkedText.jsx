import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'

const LinkedText = ({ link, text }) => {
  return(
    <Link component={RouterLink} to={link}>
      {text}
    </Link>
  )
}

export default LinkedText