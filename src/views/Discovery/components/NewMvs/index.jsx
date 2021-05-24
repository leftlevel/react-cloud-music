import React, { memo, useEffect, useState } from 'react'
import Title from 'components/Title'
import MvCard from 'components/MvCard'
import { getPersonalizedMv } from 'api/discovery'
import './index.scss'

function NewMvs(props) {
  const [mvlist, setMvlist] = useState([])

  const getMvlist = async () => {
    const { result } = await getPersonalizedMv()
    setMvlist(result)
  }

  useEffect(() => {
    getMvlist()
  }, [])

  if (mvlist) {
    return (
      <div className='new-mvs'>
        <Title name='推荐MV' />
        <ul className='list-wrap'>
          {
            mvlist.map(mv => {
              return (
                <li key={mv.id} className='list-item'>
                  <MvCard {...mv} />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  } else {
    return null
  }
}

export default memo(NewMvs)