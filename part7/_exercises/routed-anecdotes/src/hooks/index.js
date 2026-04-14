import { useContext, useState } from 'react'
//import { useContext, useEffect, useState } from 'react'
//import anecdoteService from '../services/anecdotes'
import AnecdoteContext from '../AnecdoteContext'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useAnecdotes = () => useContext(AnecdoteContext)

// export const useAnecdotes = () => {
//   const [anecdotes, setAnecdotes] = useState([])

//   useEffect(() => {
//     anecdoteService.getAll().then(data => {
//       console.log('setting anecdotes from effect',data)
//       setAnecdotes(data)
//     })
//   }, [])

  
//   const addAnecdote = async (anecdote) => {
//     const createdAnecdote = await anecdoteService.createNew(anecdote)
//     console.log(`created anecdote`, createdAnecdote,`current anecdote length: ${anecdotes.length} `)
//     setAnecdotes(anecdotes.concat(createdAnecdote))
//     return createdAnecdote
//   }

//   const deleteAnecdote = async (id) => {
//     await anecdoteService.deleteAnecdote(id)
//     setAnecdotes(anecdotes.filter(a => a.id  !== id))
//   }
  
//   return {
//     anecdotes,
//     addAnecdote,
//     deleteAnecdote
//   }
// }