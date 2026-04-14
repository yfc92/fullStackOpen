import { createContext } from "react"
import anecdoteService from './services/anecdotes'
import { useState, useEffect } from "react"

const AnecdoteContext = createContext()

export default AnecdoteContext

export const AnecdoteContextProvider = (props) => {
  const [anecdotes, setAnecdotes] = useState([])
  
  useEffect(() => {
    anecdoteService.getAll().then(data => {
      //console.log('setting anecdotes from effect',data)
      setAnecdotes(data)
    })
  }, [])

  
  const addAnecdote = async (anecdote) => {
    const createdAnecdote = await anecdoteService.createNew(anecdote)
    //console.log(`created anecdote`, createdAnecdote,`current anecdote length: ${anecdotes.length} `)
    setAnecdotes(anecdotes.concat(createdAnecdote))
    return createdAnecdote
  }

  const deleteAnecdote = async (id) => {
    await anecdoteService.deleteAnecdote(id)
    setAnecdotes(anecdotes.filter(a => a.id  !== id))
  }
  return(
    <AnecdoteContext.Provider value={ {anecdotes, addAnecdote, deleteAnecdote} }>
      {props.children}
    </AnecdoteContext.Provider>
  
  )

  // return {
  //   anecdotes,
  //   addAnecdote,
  //   deleteAnecdote
  // }
}