import { useState } from 'react'
import { Link } from 'react-router'

import HeroSearch from '../../components/HeroSearch/HeroSearch.tsx'
import { useFetchHeroes } from '../../hooks/useFetchHeroes.ts'
import useSearch from '../../hooks/useSearch.ts'
import type { Hero } from '../../types/hero.ts'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const { isLoading, data: heroes } = useFetchHeroes()
  const { search } = useSearch()
  const [heroesFound, setHeroesFound] = useState<Hero[]>([])

  const getHeroes = () => heroes.slice(1, 5)

  const searchHeroes = async (term: string) => {
    const result = await search(term)

    setHeroesFound(result)
  }

  return (
    <>
      <h2 className={styles.title}>Top Heroes</h2>

      {isLoading && <p>Loading...</p>}

      {getHeroes().length > 0 && (
        <>
          <div className={styles.heroesMenu}>
            {getHeroes().map(({ id, name }) => (
              <Link key={id} className={styles.link} to={`/detail/${id}`}>
                {name}
              </Link>
            ))}
          </div>

          <HeroSearch heroes={heroesFound} onChange={searchHeroes} />
        </>
      )}
    </>
  )
}

export default Dashboard
