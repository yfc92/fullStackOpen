// /*
// Log out functionality: window.localStorage.removeItem('loggedNoteappUser') or window.localStorage.clear()
// */
// import { useState, useEffect, useRef } from 'react'
// import Footer from './components/Footer'
// import Note from './components/Note'
// import NoteForm from './components/NoteForm'
// import noteService from './services/notes'
// import Notification from './components/Notification'
// import loginService from './services/login'
// import Togglable from './components/Togglable'
// import LoginForm from './components/LoginForm'

// const App = () => {
//   const [notes, setNotes] = useState([])
//   const [showAll, setShowAll] = useState(true)
//   const [errorMessage, setErrorMessage] = useState(null)
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [user, setUser] = useState(null)
//   const noteFormRef = useRef()


//   useEffect(() => {
//     console.log('effect')
//     noteService
//       .getAll()
//       .then(initialNotes => {
//         //console.log('promise fulfilled')
//         setNotes(initialNotes)
//       })
//   }, [])

//   useEffect(() => {
//     const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
//     if (loggedUserJSON) {
//       const user = JSON.parse(loggedUserJSON)
//       setUser(user)
//       noteService.setToken(user.token)
//     }
//   }, [])
//   //console.log('render', notes.length, 'notes')

//   const addNote = (noteObject) => {
//     noteFormRef.current.toggleVisibility()
//     noteService
//       .create(noteObject)
//       .then(returnedNote => {
//         setNotes(notes.concat(returnedNote))
//       })
//   }

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)

//   const toggleImportanceOf = (id) => {
//     //console.log(`importance of ${id} needs to be toggled`)
//     const note = notes.find(n => n.id === id)
//     const changedNote = { ...note, important: !note.important }
//     noteService
//       .update(id, changedNote)
//       .then(returnedNote => {
//         setNotes(notes.map(note => note.id === id ? returnedNote : note))
//       })
//       .catch(error => {
//         setErrorMessage(`Note '${note.content}' was already removed from server`)
//         setTimeout(() => {
//           setErrorMessage(null)
//         }, 5000)
//         setNotes(notes.filter(n => n.id !== id))
//       })
//   }

//   const handleLogin = async (event) => {
//     event.preventDefault()

//     try {
//       const user = await loginService.login({ username, password })
//       window.localStorage.setItem(
//         'loggedNoteappUser', JSON.stringify(user)
//       )
//       noteService.setToken(user.token)
//       setUser(user)
//       setUsername('')
//       setPassword('')
//     } catch {
//       setErrorMessage('wrong credentials')
//       setTimeout(() => {
//         setErrorMessage(null)
//       }, 5000)
//     }
//   }

//   const loginForm = () => (
//     <Togglable buttonLabel="login">
//       <LoginForm
//         username={username}
//         password={password}
//         handleUsernameChange={({ target }) => setUsername(target.value)}
//         handlePasswordChange={({ target }) => setPassword(target.value)}
//         handleSubmit={handleLogin}
//       />
//     </Togglable>
//   )

//   const noteForm = () => (
//     <Togglable buttonLabel="new note" ref={noteFormRef}>
//       <NoteForm createNote={addNote} />
//     </Togglable>
//   )

//   return (
//     <div>
//       <h1>Notes</h1>
//       <Notification message={errorMessage} />

//       {!user && loginForm()}
//       {user && (
//         <div>
//           <p>{user.name} logged in</p>
//           {noteForm()}
//         </div>
//       )}

//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important':'all'}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note =>
//           <Note
//             key={note.id}
//             note={note}
//             toggleImportance={() => toggleImportanceOf(note.id)}
//           /> )}
//       </ul>
//       <Footer />
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from 'react'
import noteService from './services/notes'

import {
  useMatch,
  Routes, Route, Link
} from 'react-router-dom'
import NoteList from './components/NoteList'
import Home from './components/Home'
import Footer from './components/Footer'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  const addNote = noteObject => {
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const padding = {
    padding: 5
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        //setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        // setErrorMessage(
        //   `Note '${note.content}' was already removed from server`
        // )
        // setTimeout(() => {
        //   setErrorMessage(null)
        // }, 5000)
        // //setNotes(notes.filter(n => n.id !== id))
      })
  }


  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (

    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/create">new note</Link>
      </div>


      <Routes>
        <Route path="/notes/:id" element={
          <Note note={note}
            toggleImportanceOf={toggleImportanceOf}
            deleteNote={deleteNote}
          />
        } />
        <Route path="/notes" element={
          <NoteList notes={notes} />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote}/>
        } />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App