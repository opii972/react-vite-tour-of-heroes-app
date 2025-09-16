import { type FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { useGetHero } from '../../hooks/useGetHero.ts'
import { useUpdateHero } from '../../hooks/useUpdateHero.ts'
import styles from './HeroDetail.module.css'

const HeroDetail = () => {
  const { id } = useParams()
  const { data: hero, isLoading: isHeroLoading } = useGetHero(id!)
  const [heroName, setHeroName] = useState<string>()
  const { update, isLoading: isHeroUpdating } = useUpdateHero()
  const navigate = useNavigate()

  if (isHeroLoading) {
    return <p>Loading...</p>
  }

  if (!hero) {
    return null
  }

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation() // To prevent navigation history entry after form submission

    const formData = new FormData(event.currentTarget)
    const name = formData.get('heroName') as string

    await update(id!, { ...hero, name })

    goBack()
  }

  const goBack = () => navigate(-1)

  return (
    <div>
      <h2>
        <span className={styles.heroName}>{hero.name}</span> Details
      </h2>

      <div>
        <span>id: </span>
        {hero.id}
      </div>

      <form id="heroForm" onSubmit={save}>
        <label htmlFor="hero-name" className={styles.label}>
          Hero name:{' '}
        </label>

        <input
          id="hero-name"
          name="heroName"
          defaultValue={hero.name}
          placeholder="Hero name"
          onChange={({ target: { value } }) => setHeroName(value)}
          className={styles.input}
        />
      </form>

      <button
        className={styles.button}
        disabled={isHeroUpdating}
        onClick={goBack}
      >
        go back
      </button>

      <button
        form="heroForm"
        type="submit"
        className={styles.button}
        disabled={
          !heroName || heroName?.trim() === hero?.name || isHeroUpdating
        }
      >
        save
      </button>
    </div>
  )
}

export default HeroDetail
