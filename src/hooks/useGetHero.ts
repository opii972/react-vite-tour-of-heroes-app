import { useEffect, useState } from 'react'

import type { Hero } from '../types/hero.ts'
import { delay } from '../utils/delay.ts'
import { useInMemoryData } from './useInMemoryData.ts'
import { useMessage } from './useMessage.ts'

type UseGetHero = {
  isLoading: boolean
  data: Hero | undefined
}

export const useGetHero = (id: string): UseGetHero => {
  const [isLoading, setIsLoading] = useState(false)
  const [hero, setHero] = useState<Hero>()
  const { getHero } = useInMemoryData()
  const { add } = useMessage()

  const log = (message: string) => add(`useGetHero: ${message}`)

  const init = async (id: string) => {
    setIsLoading(true)

    /** Simulate delay */
    await delay(1_000)

    log(`fetched hero id=${id}`)

    const foundHero = await getHero(+id)

    if (!foundHero) {
      log(`hero not found`)
    }

    setHero(foundHero)
    setIsLoading(false)
  }

  useEffect(() => {
    void init(id)
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isLoading,
    data: hero,
  }
}
