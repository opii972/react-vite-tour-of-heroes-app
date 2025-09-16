import { Link } from 'react-router'

import HeroSearch from '../../components/HeroSearch/HeroSearch.tsx'
import { useFetchHeroes } from '../../hooks/useFetchHeroes.ts'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const { isLoading, data: heroes } = useFetchHeroes()

  const getHeroes = () => heroes.slice(1, 5)

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

          <HeroSearch />
        </>
      )}
    </>
  )
}

export default Dashboard
