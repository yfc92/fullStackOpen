import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import useAnecdotes from './hooks/useAnecdotes'

const App = () => {

  const { anecdotes, addVote } = useAnecdotes()
  const { isPending, isError, data:resultList, error }  = anecdotes

  const handleVote = (anecdote) => {
    console.log('vote')
    addVote(anecdote)
  }

  const listDisplay = () => {
    if(isPending){
      return <><p>Refreshing Anecdote list...</p></>
    }

    if(isError) {
      return <><p>Anecdote service not available due to problems in server. Server error message: {error.message}</p></>
    }

    return(
      <>
        {
          resultList.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>))
        }
      </>
    )
  }
  
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      {listDisplay()}
    </div>
  )
}

export default App