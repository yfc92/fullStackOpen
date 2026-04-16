import { Typography } from '@mui/material'

const TextList = ({ list }) => {
  if(!list) return null
  return (
    <div>
      <ul>
        {list
          .map((text, index) => {
            return (
              <li key={`${text}-${index}`}>
                <Typography>{text}</Typography>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default TextList
