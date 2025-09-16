import { useState } from 'react'

import { delay } from '../utils/delay.ts'
import { useInMemoryData } from './useInMemoryData.ts'
import { useMessage } from './useMessage.ts'

type UseDeleteHero = {
  isLoading: boolean
  delete: (id: number) => Promise<void>
}

export const useDeleteHero = (): UseDeleteHero => {
  const [isLoading, setIsLoading] = useState(false)
  const { deleteHero } = useInMemoryData()
  const { add } = useMessage()

  const log = (message: string) => add(`useDeleteHero: ${message}`)

  const _delete = async (id: number) => {
    setIsLoading(true)

    /** Simulate delay */
    await delay(1_000)
    await deleteHero(+id)

    log(`deleted hero w/ id=${id}`)

    setIsLoading(false)
  }

  return {
    delete: _delete,
    isLoading,
  }
}
