import { useState } from 'react'

import type { Hero } from '../types/hero.ts'
import { delay } from '../utils/delay.ts'
import { useInMemoryData } from './useInMemoryData.ts'
import { useMessage } from './useMessage.ts'

type UseAddHero = {
  isLoading: boolean
  add: (heroName: string) => Promise<Hero>
}

export const useAddHero = (): UseAddHero => {
  const [isLoading, setIsLoading] = useState(false)
  const { addHero } = useInMemoryData()
  const { add: addMessage } = useMessage()

  const log = (message: string) => addMessage(`useAddHero: ${message}`)

  const add = async (heroName: string) => {
    setIsLoading(true)

    /** Simulate delay */
    await delay(1_000)

    const addedHero = await addHero({ name: heroName })

    log(`added hero w/ id=${addedHero.id}`)

    setIsLoading(false)

    return addedHero
  }

  return {
    add,
    isLoading,
  }
}
