import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter:'',
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      if(!anecdote){
        console.log(`Failed to find anecdote with id ${id} when voting`)
        return null
      }
      const updated = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({
        anecdotes: state.anecdotes
          .map(anec => anec.id === id ? updated : anec)
      }))
    },
    create: async (newAnecdoteContent) => {
      const added = await anecdoteService.create(asObject(newAnecdoteContent))
      set(state => ({ anecdotes: [...state.anecdotes, added] }))
    },
    setFilter: (filterString) => set(state => ({ filter: filterString })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes:anecdotes }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes
          .filter(anec => anec.id !== id)
      }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecDotes = useAnecdoteStore((state) => state.anecdotes)
    .toSorted((a,b) => b.votes-a.votes)
  const filterString = useAnecdoteStore((state) => state.filter)
  if(!filterString || filterString === '') return anecDotes
  return anecDotes.filter(anec => !!anec.content && anec.content.includes(filterString))
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)