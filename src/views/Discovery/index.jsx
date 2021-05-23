import React from 'react'
import { Banner, NewPlaylists } from './components'
import './index.scss'

function Discovery() {
  return (
    <div className='discovery-wrapper'>
      <Banner />
      <NewPlaylists />
    </div>
  )
}

export default Discovery