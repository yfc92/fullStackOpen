import { useNavigate } from 'react-router-dom'
import { useField, useAnecdotes } from '../hooks'

const CreateNew = () => {

  const {reset:resetContentField, ...content} = useField('text')
  const {reset:resetAuthorField, ...author }  = useField('text')
  const {reset:resetInfoField, ...info } = useField('text')
  const { addAnecdote } = useAnecdotes()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ 
      content: content.value, 
      author: author.value, 
      info: info.value, 
      votes: 0 })
    navigate('/')
  }

  const handleReset = () => {
    resetContentField()
    resetAuthorField()
    resetInfoField()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        <button type='reset' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
