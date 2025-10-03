import { type FC, type ReactNode, useState } from 'react'

import { HEROES } from '../../constants/heroes.ts'
import type { Hero } from '../../types/hero.ts'
import InMemoryDataContext from './InMemoryDataContext.tsx'

type InMemoryDataContextProviderProps = {
  children: ReactNode
}

const InMemoryDataContextProvider: FC<InMemoryDataContextProviderProps> = ({
  children,
}) => {
  const [heroes, setHeroes] = useState<Hero[]>(HEROES)

  const getHeroes = () => Promise.resolve(heroes)

  const getHero = async (id: number) => {
    const heroes = await getHeroes()

    return heroes.find((hero) => hero.id === id)
  }

  const searchHeroes = async (term: string): Promise<Hero[]> => {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return Promise.resolve([])
    }

    const heroes = await getHeroes()

    return heroes.filter(({ name }) =>
      name.toLowerCase().includes(term.toLowerCase())
    )
  }

  const addHero = async (heroToAdd: Omit<Hero, 'id'>): Promise<Hero> => {
    const heroes = await getHeroes()
    const id =
      heroes.length > 0 ? Math.max(...heroes.map(({ id }) => id)) + 1 : 11

    const newHero = {
      ...heroToAdd,
      id,
    } satisfies Hero

    setHeroes([...heroes, newHero])

    return newHero
  }

  const deleteHero = async (id: number): Promise<void> => {
    const heroFound = await getHero(id)

    if (!heroFound) {
      return
    }

    setHeroes([...heroes.filter(({ id: heroId }) => heroId !== heroFound.id)])
  }

  const updateHero = async (
    id: number,
    heroToUpdate: Hero
  ): Promise<Hero | undefined> => {
    const heroFound = await getHero(id)

    if (!heroFound) {
      return
    }

    const updatedHero = { ...heroFound, ...heroToUpdate } satisfies Hero

    setHeroes(heroes.map((hero) => (id === hero.id ? updatedHero : hero)))

    return updatedHero
  }

  return (
    <InMemoryDataContext
      value={{
        getHeroes,
        getHero,
        searchHeroes,
        addHero,
        deleteHero,
        updateHero,
      }}
    >
      {children}
    </InMemoryDataContext>
  )
}

export default InMemoryDataContextProvider
