const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response  = await fetch(baseUrl)
  if(!response.ok)
    throw new Error('Failed to fetch anecdotes')

  const data = await response.json()
  return data
}

const create = async (anecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })

  if(!response.ok)
    throw new Error(`Failed to create anecdote ${anecdote}`)
  const data = await response.json()
  return data
}

const update = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })

  if(!response.ok)
    throw new Error(`Failed to update anecdote ${anecdote}`)
  const data = await response.json()
  return data
}

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`,{
    method: 'DELETE',
  })

  if(!response.ok)
    throw new Error(`Failed to delete anecdote ${id}`)
  const data = await response.json()
  return data
}

export default { getAll, create, update, remove }