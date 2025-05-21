import { hydrateRoot } from 'react-dom/client'
import App from './components/App'
import './style.css'
import { StrictMode } from 'react'

const container = document.getElementById('app') as HTMLElement

console.log('main.client: ', {
  container,
})

hydrateRoot(
  container,
  <StrictMode>
    <App />
  </StrictMode>,
)
