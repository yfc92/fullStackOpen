const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

const createAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }
 
  const response = await fetch(baseUrl, options)
 
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
 
  return await response.json()
}

const updateAnecdote = async (updateAnecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateAnecdote)
  }

  const response = await fetch(`${baseUrl}/${updateAnecdote.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update note')
  }

  return await response.json()
}

export {
  getAnecdotes,
  createAnecdote,
  updateAnecdote
}