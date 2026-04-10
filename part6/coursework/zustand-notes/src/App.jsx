import { useEffect } from 'react'
import { useNoteActions } from './store'
import NoteForm from './NoteForm'

const App = () => {

  const { initialize } = useNoteActions()

   useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}

export default App