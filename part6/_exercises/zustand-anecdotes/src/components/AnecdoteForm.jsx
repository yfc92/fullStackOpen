import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { create } = useAnecdoteActions()
  const createAnecdote = (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.anecdote.value
    create(anecdoteContent)
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