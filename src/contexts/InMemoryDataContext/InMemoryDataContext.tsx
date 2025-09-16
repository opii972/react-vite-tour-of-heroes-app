import { createContext } from 'react'

import type { HeroesAPI } from '../../types/heroesAPI.ts'

const InMemoryDataContext = createContext<HeroesAPI | undefined>(undefined)

export default InMemoryDataContext
