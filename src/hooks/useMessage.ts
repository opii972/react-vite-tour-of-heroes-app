import { useContext } from 'react'

import MessageContext from '../contexts/MessageContext/MessageContext.tsx'

export const useMessage = () => {
  const context = useContext(MessageContext)

  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageContextProvider')
  }

  return context
}
