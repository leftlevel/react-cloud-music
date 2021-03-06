import React, { memo, useEffect, useState } from 'react'
import PlaylistCard from 'components/PlaylistCard'
import Title from 'components/Title'
import { getPersonalized } from 'api/discovery'
import './index.scss'

function NewPlaylists() {
  const [list, setList] = useState([])

  const getList = async () => {
    const { result } = await getPersonalized({ limit: 10 })
    setList(result)
  }

  useEffect(() => {
    getList()
  }, [])

  if (list.length) {
    return (
      <div className='recommed'>
        <Title name='推荐歌单' />
        <div className='new-playlist'>
          {
            list.map((item) => {
              return <PlaylistCard {...item} key={item.id} />
            })
          }
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default memo(NewPlaylists)