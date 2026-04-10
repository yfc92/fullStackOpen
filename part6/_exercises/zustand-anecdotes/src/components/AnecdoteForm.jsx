import { useNotificationActions } from '../notificationStore'
import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { create } = useAnecdoteActions()
  const { update:updateNotification } = useNotificationActions()

  const createAnecdote = async (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.anecdote.value
    await create(anecdoteContent)
    updateNotification(`New anecdote added: ${anecdoteContent}`)
    e.target.reset()
  }
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm