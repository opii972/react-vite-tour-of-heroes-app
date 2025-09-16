import type { Hero } from './hero.ts'

export type HeroesAPI = {
  getHeroes: () => Promise<Hero[]>
  getHero: (id: number) => Promise<Hero | undefined>
  searchHeroes: (term: string) => Promise<Hero[]>
  addHero: (hero: Omit<Hero, 'id'>) => Promise<Hero>
  deleteHero: (id: number) => Promise<void>
  updateHero: (id: number, hero: Hero) => Promise<Hero | undefined>
}
