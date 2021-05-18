import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Header } from './components'
import './index.scss'

function Layout(props) {
  const { route } = props

  return (
    <div className='layout-wrapper'>
      <Header />
    </div>
  )
}

export default Layout