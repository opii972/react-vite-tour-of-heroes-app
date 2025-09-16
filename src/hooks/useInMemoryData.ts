import { useContext } from 'react'

import InMemoryDataContext from '../contexts/InMemoryDataContext/InMemoryDataContext.tsx'

export const useInMemoryData = () => {
  const context = useContext(InMemoryDataContext)

  if (context === undefined) {
    throw new Error(
      'useInMemoryData must be used within a InMemoryDataContextProvider'
    )
  }

  return context
}
