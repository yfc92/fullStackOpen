import { useNotificationActions } from '../notificationStore'
import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()
  const { update:updateNotification } =  useNotificationActions()

  const handleVote = async (anecdote) => {
    await vote(anecdote.id)
    updateNotification(`You voted for ${anecdote.content}`)
  }

  const handleDelete = async (anecdote) => {
    await remove(anecdote.id)
    updateNotification(`Deleted anecdote ${anecdote.content}`)
  }

  return(
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && <button onClick={() => handleDelete(anecdote)}>delete</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList