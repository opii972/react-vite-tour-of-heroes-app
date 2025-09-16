import { useState } from 'react'

import type { Hero } from '../types/hero.ts'
import { useInMemoryData } from './useInMemoryData.ts'
import { useMessage } from './useMessage.ts'

type UseSearch = {
  isLoading: boolean
  search: (term: string) => Promise<Hero[]>
}

const useSearch = (): UseSearch => {
  const [isLoading, setIsLoading] = useState(false)
  const { searchHeroes } = useInMemoryData()
  const { add } = useMessage()

  const log = (message: string): void => add(`useSearch: ${message}`)

  const search = async (term: string) => {
    setIsLoading(true)

    const foundHeroes = await searchHeroes(term)

    log(
      foundHeroes
        ? `found heroes matching "${term}"`
        : `no heroes matching "${term}"`
    )

    setIsLoading(false)

    return foundHeroes
  }

  return {
    isLoading,
    search,
  }
}

export default useSearch
