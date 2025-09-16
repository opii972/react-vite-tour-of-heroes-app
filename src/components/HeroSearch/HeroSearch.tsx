import { type ChangeEvent, useState } from 'react'
import { Link } from 'react-router'
import { useDebouncedCallback } from 'use-debounce'

import useSearch from '../../hooks/useSearch.ts'
import type { Hero } from '../../types/hero.ts'
import styles from './HeroSearch.module.css'

const HeroSearch = () => {
  const [heroName, setHeroName] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const { search } = useSearch()
  const [heroes, setHeroes] = useState<Hero[]>([])
  const debounced = useDebouncedCallback(async (term: string) => {
    setDebouncedTerm(term)

    /** Ignore new term if same as previous term **/
    if (debouncedTerm !== heroName) {
      const heroesFound = await search(term)

      setHeroes(heroesFound)
    }
  }, 300)

  const searchHeroes = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setHeroName(value)

    debounced(value)
  }

  return (
    <div>
      <label className={styles.label} htmlFor="search-box">
        Hero Search
      </label>

      <input
        id="search-box"
        className={styles.input}
        onChange={searchHeroes}
        value={heroName}
      />

      {heroes.length > 0 && (
        <ul className={styles.searchResult}>
          {heroes.map(({ id, name }) => (
            <li key={id}>
              <Link className={styles.link} to={`/detail/${id}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HeroSearch
