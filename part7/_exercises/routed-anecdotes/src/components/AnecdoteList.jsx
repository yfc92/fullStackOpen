import { useAnecdotes } from "../hooks"

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotes()

  //console.log(`anecdote list: length - ${anecdotes.length}, content:`, anecdotes)
  return(
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {
        anecdotes.map(anecdote => {
          return(
            <li key={anecdote.id}>
              {anecdote.content}
              <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
            </li>
          )
        })
      }
    </ul>
  </div>
  )
}

export default AnecdoteList
