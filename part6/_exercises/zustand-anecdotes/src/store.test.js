import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act, render } from '@testing-library/react'
import { useAnecdoteActions, useAnecdotes, useAnecdoteStore } from './store'
vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

import anecdoteService from './services/anecdotes'
import AnecdoteList from './components/AnecdoteList'

const testAnecdotes = [
  {
    'content': 'If it hurts, do it more often',
    'id': '47145',
    'votes': 2
  },
  {
    'content': 'Adding manpower to a late software project makes it later!',
    'id': '21149',
    'votes': 4
  },
  {
    'content': 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'id': '69581',
    'votes': 3
  },
  {
    'content': 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'id': '36975',
    'votes': 5
  },
  {
    'content': 'Premature optimization is the root of all evil.',
    'id': '25170',
    'votes': 1
  },
  {
    'content': 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'id': '98312',
    'votes': 0
  }
]

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('Exercises 6.12 - 6.15', () => {
  it('is initialized with anecdotes from the backend', async () => {
    anecdoteService.getAll.mockResolvedValue(testAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    expect(useAnecdoteStore.getState().anecdotes).toEqual(testAnecdotes)
    //alternative:
    // const { result: anecResult } = renderHook(() => useAnecdotes())
    // //check number of anecdotes instead of actual content because the initialized content is sorted
    // expect(anecResult.current).toHaveLength(testAnecdotes.length)

  })

  it(`verifies the anecdote list component receives 
    anecdotes from the store sorted by votes`, () => {

    useAnecdoteStore.setState({ anecdotes: testAnecdotes })

    const { result: anecResult } = renderHook(() => useAnecdotes())
    const sortedTestAnecs = testAnecdotes.toSorted((a,b) => b.votes - a.votes)
    expect(anecResult.current).toEqual(sortedTestAnecs)

  })

  it('verifies the anecdote list receives a properly filtered list of anecdotes',
    () => {
      const testFilter = 'first'
      const expectedAnecList = [testAnecdotes[2], testAnecdotes[5]]

      useAnecdoteStore.setState({
        anecdotes: testAnecdotes,
      })
      const { result: anecActionsResult } = renderHook(() => useAnecdoteActions())

      act(() => {
        anecActionsResult.current.setFilter(testFilter)
      })

      const { result: anecResult } = renderHook(() => useAnecdotes())
      expect(anecResult.current).toEqual(expectedAnecList)
    })

  it('verifies that voting increases the number of votes for an anecdote', async () => {

    const targetAnec =  {
      'content': 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'id': '98312',
      'votes': 0
    }
    anecdoteService.update.mockResolvedValue({ ...targetAnec, votes: targetAnec.votes + 1 })

    useAnecdoteStore.setState({
      anecdotes: testAnecdotes,
    })

    const { result: anecActionsResult } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await anecActionsResult.current.vote(targetAnec.id)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())

    const updatedAnec = anecdotesResult.current.find(a => a.id === targetAnec.id)
    expect(updatedAnec.votes).toBe(targetAnec.votes + 1)
  })

})