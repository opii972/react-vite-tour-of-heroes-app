import { useState } from 'react'

import type { Hero } from '../types/hero.ts'
import { delay } from '../utils/delay.ts'
import { useInMemoryData } from './useInMemoryData.ts'
import { useMessage } from './useMessage.ts'

type UseUpdateHero = {
  isLoading: boolean
  update: (id: string, hero: Hero) => Promise<Hero | undefined>
}

export const useUpdateHero = (): UseUpdateHero => {
  const [isLoading, setIsLoading] = useState(false)
  const { updateHero } = useInMemoryData()
  const { add } = useMessage()

  const log = (message: string) => add(`useUpdateHero: ${message}`)

  const update = async (id: string, hero: Hero) => {
    setIsLoading(true)

    /** Simulate delay */
    await delay(1_000)
    const updatedHero = await updateHero(+id, hero)

    log(
      updatedHero ? `updated hero id=${id}` : `cannot update hero w/ id=${id}`
    )

    setIsLoading(false)

    return updatedHero
  }

  return {
    update,
    isLoading,
  }
}
