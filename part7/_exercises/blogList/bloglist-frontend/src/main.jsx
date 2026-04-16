import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { BrowserRouter as Router } from 'react-router-dom'
import { NotificationContextProvider } from './query-context/NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './query-context/UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </NotificationContextProvider>
  </UserContextProvider>
)
