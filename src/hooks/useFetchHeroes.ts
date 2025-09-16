import { useEffect, useState } from 'react'

import type { Hero } from '../types/hero.ts'
import { delay } from '../utils/delay.ts'
import { useInMemoryData } from './useInMemoryData.ts'
import { useMessage } from './useMessage.ts'

type UseFetchHeroes = {
  isLoading: boolean
  data: Hero[]
}

export const useFetchHeroes = (): UseFetchHeroes => {
  const [isLoading, setIsLoading] = useState(false)
  const [heroes, setHeroes] = useState<Hero[]>([])
  const { getHeroes } = useInMemoryData()
  const { add } = useMessage()

  const log = (message: string) => add(`useFetchHeroes: ${message}`)

  const init = async () => {
    setIsLoading(true)

    /** Simulate delay */
    await delay(1_000)

    const heroes = await getHeroes()

    log('fetched heroes')

    setHeroes(heroes)
    setIsLoading(false)
  }

  useEffect(() => {
    void init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isLoading,
    data: heroes,
  }
}
