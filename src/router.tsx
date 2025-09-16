import { createBrowserRouter } from 'react-router'

import Dashboard from './routes/Dashboard/Dashboard.tsx'
import HeroDetail from './routes/HeroDetail/HeroDetail.tsx'
import Heroes from './routes/Heroes/Heroes.tsx'
import Root from './routes/Root/Root.tsx'
import RootBoundary from './routes/RootBoundary.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <RootBoundary />,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: 'detail/:id',
        Component: HeroDetail,
      },
      {
        path: 'heroes',
        Component: Heroes,
      },
    ],
  },
])

export default router
