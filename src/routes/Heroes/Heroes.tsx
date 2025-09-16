import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router'

import { useAddHero } from '../../hooks/useAddHero.ts'
import { useDeleteHero } from '../../hooks/useDeleteHero.ts'
import { useFetchHeroes } from '../../hooks/useFetchHeroes.ts'
import type { Hero } from '../../types/hero.ts'
import styles from './Heroes.module.css'

const Heroes = () => {
  const { isLoading, data } = useFetchHeroes()
  const { isLoading: isHeroAdding, add } = useAddHero()
  const { isLoading: isHeroDeleting, delete: _delete } = useDeleteHero()
  const [heroName, setHeroName] = useState<string>('')
  const [heroes, setHeroes] = useState<Hero[]>([])

  useEffect(() => {
    if (data) {
      setHeroes(data)
    }
  }, [data])

  const addHero = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newHero = await add(heroName)

    // Optimistic
    if (newHero) {
      setHeroes([...heroes, newHero])
      setHeroName('')
    }
  }

  const deleteHero = async (id: number) => {
    await _delete(id)

    // Optimistic
    setHeroes((prevState) => prevState?.filter((hero) => hero.id !== id))
  }

  return (
    <>
      <h2>My Heroes</h2>

      <form onSubmit={addHero} noValidate>
        <label htmlFor="new-hero">Hero name: </label>

        <input
          name="new-hero"
          className={styles.input}
          value={heroName}
          onChange={({ target }) => setHeroName(target?.value)}
        />

        <button
          type="submit"
          disabled={!heroName?.trim() || isHeroAdding}
          className={styles.addButton}
        >
          Add hero
        </button>
      </form>

      {isLoading && <p>Loading...</p>}

      {heroes.length > 0 && (
        <ul className={styles.heroes}>
          {heroes.map(({ id, name }) => (
            <li key={id} className={styles.heroItem}>
              <Link className={styles.link} to={`/detail/${id}`}>
                <span className={styles.badge}>{id}</span>
                {name}
              </Link>

              <button
                className={styles.deleteButton}
                title="delete hero"
                disabled={isHeroDeleting}
                onClick={() => deleteHero(id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Heroes
