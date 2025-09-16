import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import InMemoryDataContextProvider from './contexts/InMemoryDataContext/InMemoryDataContextProvider.tsx'
import MessageContextProvider from './contexts/MessageContext/MessageContextProvider.tsx'
import router from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MessageContextProvider>
      <InMemoryDataContextProvider>
        <RouterProvider router={router} />
      </InMemoryDataContextProvider>
    </MessageContextProvider>
  </StrictMode>
)
