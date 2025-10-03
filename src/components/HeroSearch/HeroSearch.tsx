import { type ChangeEvent, type FC, useState } from 'react'
import { Link } from 'react-router'
import { useDebouncedCallback } from 'use-debounce'

import type { Hero } from '../../types/hero.ts'
import styles from './HeroSearch.module.css'

type HeroSearchProps = {
  heroes: Hero[]
  onChange?: (term: string) => void
}

const HeroSearch: FC<HeroSearchProps> = ({ heroes, onChange }) => {
  const [heroName, setHeroName] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const debounced = useDebouncedCallback(async (term: string) => {
    setDebouncedTerm(term)

    /** Ignore new term if similar to previous term **/
    if (debouncedTerm !== heroName) {
      onChange?.(term)
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
