import { createAnecdote, updateAnecdote, getAnecdotes } from "../../requests"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const queryKey = 'anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: [queryKey],
    queryFn: getAnecdotes,
    refetchOnWindowFocus:false,
    retry: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData([queryKey])
      queryClient.setQueryData([queryKey], anecdotes.concat(newAnecdote))
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:[queryKey]})
    }
  })

  return{
    anecdotes: {
      isPending: result.isPending,
      isError: result.isError,
      data: result.data,
      error: result.error
    },
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, id:getId(), votes:0 }),
    addVote: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})    
  }
}

export default useAnecdotes