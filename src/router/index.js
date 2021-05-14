import React, { lazy, Suspense } from 'react'
import { Redirect } from 'react-router-dom'

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const Test = lazy(() => import('../views/Test'))

const routes = [
  {
    path: '/test',
    component: SuspenseComponent(Test)
  }
]

export default routes