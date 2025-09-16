import { isRouteErrorResponse, useRouteError } from 'react-router'

import NotFound from './NotFound.tsx'

const RootBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Something went wrong</p>
    </div>
  )
}

export default RootBoundary
